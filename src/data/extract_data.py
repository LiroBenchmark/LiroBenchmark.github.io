import json
import pandas as pd
import numpy as np
from itertools import groupby
import re


def build_id_string(name):
    """Builds an URL-friendly id from the name

    This method replaces non-alphanumeric characters with a dash
    and collapses sequences of dashes into a single one.

    Parameters
    ----------
    name: string
        The name for which to build an id.

    Returns
    -------
    string
        The id string.
    """
    url = re.sub(r"[\W_]+", "-", name, flags=re.MULTILINE)
    url = re.sub(r"[-]+", "-", url).strip('-')
    return url.lower()


def process_homepage_data(homepage_data):
    """Groups the homepage data by area.

    Parameters
    ----------
    homepage_data: iterable
        An iterable of tasks and their areas.

    Returns
    -------
    dict
        A dictionary with a single key named 'areas'
        and a list of areas with their tasks.
    """
    result = {"areas": []}
    for area_name, tasks in groupby(homepage_data, lambda x: x["area"]):
        area_tasks = [{
            "id": build_id_string(t["name"]),
            "name": t["name"],
            "datasets": t["datasets"]
        } for t in tasks]
        result["areas"].append({"name": area_name, "tasks": area_tasks})
    return result


excel_file = "LEADERBOARD.xlsx"

LEADERBOARD = pd.read_excel(excel_file, sheet_name="LEADERBOARD").replace(np.nan, '', regex=True)
RESULTS = pd.read_excel(excel_file, sheet_name="RESULTS").replace(np.nan, '', regex=True)
DATASETS = pd.read_excel(excel_file, sheet_name="DATASETS").replace(np.nan, '', regex=True)
TASKS = pd.read_excel(excel_file, sheet_name="TASKS").replace(np.nan, '', regex=True)
METRICS = pd.read_excel(excel_file, sheet_name="METRICS").replace(np.nan, '', regex=True)


# CREATE DATASETS_JSON OBJECT
def build_metrics_dict(metrics_df):
    """Build a dict of metrics from the input data.

    Parameters
    ----------
    metrics_df: pandas.DataFrame
        The data frame containing properties of metrics.

    Returns
    -------
    dict
        A dict where the key is metric name and the value is
        a tuple of (type, range, description).

    Remarks
    -------
    The type of the metric is denoted by two constants:
    - 'Higher-is-better' and
    - 'Lower-is-better'.
    """
    return {
        m['METRICS']: [m['TYPE'], m['RANGE'], m['DESCRIPTION']]
        for _, m in metrics_df.iterrows()
    }


class DatasetsDetailsBuilder(object):
    """Builds dataset details.

    """
    def __init__(self, datasets, results, leaderboard):
        """Creates a new instance of DatasetsDetailsBuilder.

        Parameters
        ----------
        datasets: pandas.DataFrame
            The dataframe containing dataset definitions with their
            associated task, name, description etc.
        results: pandas.DataFrame
            The dataframe containing model scores.
        leaderboard: pandas.DataFrame
            The dataframe containing best performing model per task.
        """
        super(DatasetsDetailsBuilder, self).__init__()
        self.datasets = datasets
        self.results = results
        self.leaderboard = leaderboard

    def build_dataset_details(self):
        """Builds the details of datasets in the format required for front-end.

        Returns
        -------
        list
            The list of datasets with their details.
        """
        datasets = []
        for _, row in self.datasets.iterrows():
            dataset = self._build_dataset(row)
            dataset_name = dataset['dataset_name']

            dataset['metrics'] = self._get_dataset_metrics(dataset_name)
            dataset['models'] = self._get_dataset_models(dataset_name)
            datasets.append(dataset)
        return datasets

    def _get_dataset_models(self, dataset_name):
        """Gets all the models for specified dataset from results dataframe.

        Parameters
        ----------
        dataset_name: string
            The name of the dataset.

        Returns
        list of objects
            The list of models with their data.
        """
        df = self.results[self.results['DATASET'] == dataset_name]
        models = list(df['MODEL'].unique())
        results = []
        for model in models:
            leaderboard = self.leaderboard
            model_info = leaderboard[(leaderboard['MODEL NAME'] == model) &
                                     (leaderboard['DATASET'] == dataset_name)]
            if model_info.empty:
                err = "No rows in leaderboard for model '{}' and dataset '{}'"
                raise AssertionError(err.format(model, dataset_name))
            model_info = model_info.iloc[0]
            model_results = df[df['MODEL'] == model]
            item = {
                "model": model,
                "extra_training_data": bool(model_info['EXTRA TRAINING DATA']),
                "paper_title": model_info['PAPER TITLE'],
                "paper_link": model_info['PAPER LINK'],
                "source_link": model_info['SOURCE LINK'],
                "date_month": int(model_info['DATE MONTH']),
                "date_year": int(model_info['DATE YEAR']),
                "results": {
                    row['METRIC']: row['VALUE']
                    for _, row in model_results.iterrows()
                }
            }
            results.append(item)

        return results

    def _get_dataset_metrics(self, dataset_name):
        """Builds a list of metrics for the dataset.

        Iterates through all results for the specified dataset
        and builds a collection of all metrics.

        Parameters
        ----------
        dataset_name: string
            The name of the dataset for which to find metrics.

        Returns
        -------
        list of str
            The metrics of the dataset.
        """
        df = self.results[self.results['DATASET'] == dataset_name]
        metrics = list(df['METRIC'].unique())
        return metrics

    def _build_dataset(self, row):
        """Builds the dataset object from a dataframe row.

        Parameters
        ----------
        row: pandas.Series
            The series containing dataset properties.

        Returns
        -------
        dict
            The dataset object as a dictionary.
        """
        return {
            "task": row['TASK'],
            "id": build_id_string(row['DATASET NAME']),
            "dataset_name": row['DATASET NAME'],
            "dataset_description": row['DATASET DESCRIPTION'],
            "dataset_link": row['DATASET LINK'],
            "preferred_metric": row['PREFERRED METRIC'],
            "models": []
        }


ds_builder = DatasetsDetailsBuilder(DATASETS, RESULTS, LEADERBOARD)
datasets_json = {"datasets": ds_builder.build_dataset_details()}

# CREATE TASKS_JSON OBJECT


def build_tasks_json(tasks, datasets, results, metrics, leaderboard):
    print("CREATE TASKS_JSON OBJECT ...")
    tasks_json = []
    for index, row in tasks.iterrows():
        task_json_object = {
            "area": row['AREA'],
            "id": build_id_string(row['NAME']),
            "task_name": row['NAME'],
            "task_description": row['DESCRIPTION'],
            "datasets": []
        }
        # get all datasets for this particular task
        datasets_unique = datasets[datasets['TASK'].eq(
            row['NAME'])]['DATASET NAME'].unique()
        datasets_list = []
        for dataset in datasets_unique:
            # get best model for this dataset, with attributes: model_name, paper_title, paper_link, source_link by PREFERRED METRIC
            preffered_metric = datasets[datasets['DATASET NAME'].eq(
                dataset)]['PREFERRED METRIC'].iloc[0].strip()
            print("\tFor task {}, dataset {} has preferred metric [{}]".format(
                row['NAME'], dataset, preffered_metric))
            model_results_df = results[
                results['DATASET'].eq(dataset)
                & results['METRIC'].eq(preffered_metric)]
            if model_results_df.shape[0] == 0:
                print(
                    "\t\tCould not find any models that have results for this dataset with the preferred metric!"
                )
                continue
            # get metric type (higher or lower)
            metric_type, _, _ = metrics[preffered_metric]
            print("\t\tMetric type is: {}".format(metric_type))
            print("\t\tSorting {} models, here's the list:".format(
                model_results_df.shape[0]))
            if "high" in metric_type.lower():
                ascending = False
            else:
                ascending = True
            # sort according to metric type, get 1st result
            model_results_df = model_results_df.sort_values(
                by='VALUE', ascending=ascending)
            print(model_results_df)

            # get model properties from leaderboard
            model_properties_df = leaderboard[leaderboard['MODEL NAME'].eq(
                model_results_df['MODEL'].iloc[0])]

            # NOTE: we take the model with the best score irrespective of extra training data
            dataset_object = {
                "dataset_id": build_id_string(dataset),
                "dataset_name": dataset,
                "metric": preffered_metric,
                "model_name": model_results_df['MODEL'].iloc[0],
                "paper_title": model_properties_df['PAPER TITLE'].iloc[0],
                "paper_link": model_properties_df['PAPER LINK'].iloc[0],
                "source_link": model_properties_df['SOURCE LINK'].iloc[0],
            }
            datasets_list.append(dataset_object)
        task_json_object["datasets"] = datasets_list
        tasks_json.append(task_json_object)
    return {"tasks": tasks_json}


tasks_json = build_tasks_json(TASKS, DATASETS, RESULTS,
                              build_metrics_dict(METRICS), LEADERBOARD)

# CREATE HOMEPAGE_JSON OBJECT
print("CREATE HOMEPAGE_JSON OBJECT ...")
homepage_json = []
for index, row in TASKS.iterrows():
    print("\tFound task: [{}]".format(row['NAME']))
    task = {
        "area": row['AREA'],
        "name": row['NAME'], # this is the name of the TASK
        "datasets": []
    }
    # get datasets for this task
    datasets = DATASETS[DATASETS['TASK'].eq(row['NAME'])]['DATASET NAME'].unique()
    print("\t\tFound {} datasets for this task.".format(len(datasets)))
    datasets_list = []
    # for each dataset, count the number of submissions
    for dataset in datasets:
        models_df = RESULTS[RESULTS['DATASET'].eq(dataset)]['MODEL'].unique()
        datasets_list.append({"dataset":dataset, "submission_count":models_df.shape[0]})
        print("\t\t\tDataset [{}] has {} submissions.".format(dataset,models_df.shape[0]))
    task["datasets"] = datasets_list
    homepage_json.append(task)

homepage_json = process_homepage_data(homepage_json)
# WRITE DATA
print("WRITING DATA ...")
json.dump(datasets_json, open("datasets.json","w", encoding="utf8"), indent=4)
json.dump(tasks_json, open("tasks.json","w", encoding="utf8"), indent=4)
json.dump(homepage_json, open("homepage.json","w", encoding="utf8"), indent=4)
print("All DONE.")

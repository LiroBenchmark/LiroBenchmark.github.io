import json
import pandas as pd
import numpy as np
from itertools import groupby
import re
import logging

logging.basicConfig(format='%(asctime)s : %(levelname)s : %(message)s',
                    level=logging.INFO)


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


excel_file = "LEADERBOARD.xlsx"

LEADERBOARD = pd.read_excel(excel_file, sheet_name="LEADERBOARD").replace(np.nan, '', regex=True)
RESULTS = pd.read_excel(excel_file, sheet_name="RESULTS").replace(np.nan, '', regex=True)
DATASETS = pd.read_excel(excel_file, sheet_name="DATASETS").replace(np.nan, '', regex=True)
TASKS = pd.read_excel(excel_file, sheet_name="TASKS").replace(np.nan, '', regex=True)
METRICS = pd.read_excel(excel_file, sheet_name="METRICS").replace(np.nan, '', regex=True)


# CREATE DATASETS_JSON OBJECT
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


class TasksDetailsBuilder(object):
    """Builds task details.

    """
    def __init__(self, tasks, datasets, results, metrics, leaderboard):
        """Creates a new instance of TasksDetailsBuilder.

        Parameters
        ----------
        tasks: pandas.DataFrame
            The dataframe containing tasks definitions.
        datasets: pandas.DataFrame
            The dataframe containing dataset definitions with their
            associated task, name, description etc.
        results: pandas.DataFrame
            The dataframe containing model scores.
        metrics: pandas.DataFrame
            The dataframe containing metrics.
        leaderboard: pandas.DataFrame
            The dataframe containing best performing model per task.
        """
        super(TasksDetailsBuilder, self).__init__()
        self.tasks = tasks
        self.datasets = datasets
        self.results = results
        self.metrics = metrics
        self.leaderboard = leaderboard

    def build_task_details(self):
        """Builds the details of tasks in the format required for front-end.

        Returns
        -------
        list
            The list of tasks and their details.
        """
        return [{
            "area": row['AREA'],
            "id": build_id_string(row['NAME']),
            "task_name": row['NAME'],
            "task_description": row['DESCRIPTION'],
            "datasets": self._build_task_datasets(row['NAME'])
        } for _, row in self.tasks.iterrows()]

    def _build_task_datasets(self, task_name):
        """Builds the list of the datasets for current task with their best model.

        Parameters
        ----------
        task_name: string
            The name of the task.

        Returns
        -------
        list
            The list of datasets for current task.
        """
        datasets = []
        df = self.datasets[self.datasets['TASK'] == task_name]
        for _, row in df.iterrows():
            dataset = row['DATASET NAME']
            pref_metric = row['PREFERRED METRIC']
            model = self._get_best_model(dataset, pref_metric)
            if not model:
                logging.warning(
                    "No best model found for dataset '{}' and metric '{}'.".
                    format(dataset, pref_metric))
                continue
            paper_title, paper_link, source_link = self._get_model_properties(
                model)
            datasets.append({
                "dataset_id": build_id_string(dataset),
                "dataset_name": dataset,
                "metric": pref_metric,
                "model_name": model,
                "paper_title": paper_title,
                "paper_link": paper_link,
                "source_link": source_link
            })
        return datasets

    def _get_model_properties(self, model):
        """Gets the model properties from leaderboard.

        Parameters
        ----------
        model: string
            The name of the model for which to retrieve properties.

        Returns
        -------
        (paper_title:string, paper_link:string, source_link:string)
            The properties of the model.
        """
        props = self.leaderboard[self.leaderboard['MODEL NAME'] ==
                                 model].iloc[0]
        return props['PAPER TITLE'], props['PAPER LINK'], props['SOURCE LINK']

    def _get_best_model(self, dataset, metric):
        """Finds the best model for the specified dataset and metric.

        Parameters
        ----------
        dataset: string
            The name of the dataset.
        metric: string
            The name of the metric.

        Returns
        -------
        string
            The name of the best model.
        """
        results = self.results
        results = results[(results['DATASET'] == dataset)
                          & (results['METRIC'] == metric)]
        metric = self.metrics[self.metrics['METRICS'] == metric]
        metric = metric.iloc[0]
        metric_type = metric['TYPE']
        sort_ascending = True if "high" in metric_type.lower() else False
        results = results.sort_values(by='VALUE', ascending=sort_ascending)
        if results.empty:
            return None
        model = results.iloc[0]['MODEL']
        return model


t_builder = TasksDetailsBuilder(TASKS, DATASETS, RESULTS, METRICS, LEADERBOARD)
tasks_json = {"tasks": t_builder.build_task_details()}


class AreasDetailsBuilder(object):
    """Builds details for areas.

    """
    def __init__(self, datasets, tasks, results, leaderboard):
        """Creates a new instance of AreasDetailsBuilder.

        Parameters
        ----------
        datasets: pandas.DataFrame
            The dataframe containing dataset definitions with their
            associated task, name, description etc.
        tasks: pandas.DataFrame
            The dataframe containing tasks definitions.
        results: pandas.DataFrame
            The dataframe containing model scores.
        leaderboard: pandas.DataFrame
            The dataframe containing best performing model per task.
        """
        super(AreasDetailsBuilder, self).__init__()
        self.datasets = datasets
        self.tasks = tasks
        self.results = results
        self.leaderboard = leaderboard

    def build_area_details(self):
        """Builds the details of areas in the format required for front-end.

        Returns
        -------
        list
            The list of areas and their associated tasks.
        """
        task_details = [{
            "area": row['AREA'],
            "id": build_id_string(row['NAME']),
            "name": row['NAME'],
            "datasets": self._build_task_datasets(row['NAME'])
        } for _, row in self.tasks.iterrows()]

        result = []
        for area, tasks in groupby(task_details, lambda t: t["area"]):
            area_tasks = [{
                "id": t["id"],
                "name": t["name"],
                "datasets": t["datasets"]
            } for t in tasks]
            result.append({"name": area, "tasks": area_tasks})
        return result

    def _build_task_datasets(self, task):
        """Build the collection of datasets for current task.

        Parameters
        ----------
        task: string
            The name of the current task.

        Returns
        -------
        list
            The datasets associated with the current task.
        """
        datasets = self.datasets[self.datasets['TASK'] == task]
        results = pd.merge(datasets,
                           self.results,
                           how='inner',
                           left_on='DATASET NAME',
                           right_on='DATASET')
        results = results.groupby(by='DATASET')['MODEL'].nunique()
        return [{
            "dataset": name,
            "submission_count": value
        } for name, value in results.items()]


# CREATE HOMEPAGE_JSON OBJECT
ab = AreasDetailsBuilder(DATASETS, TASKS, RESULTS, LEADERBOARD)
homepage_json = {"areas": ab.build_area_details()}
# WRITE DATA
print("WRITING DATA ...")
json.dump(datasets_json, open("datasets.json","w", encoding="utf8"), indent=4)
json.dump(tasks_json, open("tasks.json","w", encoding="utf8"), indent=4)
json.dump(homepage_json, open("homepage.json","w", encoding="utf8"), indent=4)
print("All DONE.")

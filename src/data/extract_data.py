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
    url = re.sub(r"[-]+", "-", url)
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


def build_datasets_json(datasets, results, leaderboard):
    print("CREATE DATASETS_JSON OBJECT ...")
    datasets_json = []
    for index, row in datasets.iterrows():
        dataset_json_object = {
            "task": row['TASK'],
            # "id": build_id_string(row['DATASET NAME']),
            "dataset_name": row['DATASET NAME'],
            "dataset_description": row['DATASET DESCRIPTION'],
            "dataset_link": row['DATASET LINK'],
            "preferred_metric": row['PREFERRED METRIC'],
            "models": []
        }
        # find all models in results that we have for this dataset
        models = results[results['DATASET'] ==
                         row['DATASET NAME']]['MODEL'].unique()
        models_list = []
        for model in models:
            # for each model get properties from leaderboard
            model_properties_df = leaderboard[leaderboard['MODEL NAME'] ==
                                              model]
            assert model_properties_df.shape[
                0] == 1, "ERROR: Model [{}] not found in leaderboard!".format(
                    model)
            model_dict = {
                "model":
                model_properties_df["MODEL NAME"].iloc[0],
                "metrics": [],
                "extra_training_data":
                False
                if model_properties_df["EXTRA TRAINING DATA"].iloc[0].strip()
                == "" else True,
                "paper_title":
                model_properties_df["PAPER TITLE"].iloc[0],
                "paper_link":
                model_properties_df["PAPER LINK"].iloc[0],
                "source_link":
                model_properties_df["SOURCE LINK"].iloc[0],
                "date_month":
                int(model_properties_df["DATE MONTH"].iloc[0]),
                "date_year":
                int(model_properties_df["DATE YEAR"].iloc[0]),
            }

            # for each model get all metrics from results
            model_results_df = results[
                results['MODEL'].eq(model)
                & results['DATASET'].eq(row['DATASET NAME'])]
            metrics = []
            for r_index, r_row in model_results_df.iterrows():
                metric = [r_row['METRIC'], r_row['VALUE']]
                assert r_row[
                    'METRIC'] != '', "ERROR: Please fill in metric for model [{}] for dataset [{}] in sheet results!".format(
                        model, row['DATASET NAME'])
                assert r_row[
                    'VALUE'] != '', "ERROR: Please fill in metric for model [{}] for dataset [{}] in sheet results!".format(
                        model, row['DATASET NAME'])
                metrics.append(metric)
            model_dict["metrics"] = metrics
            models_list.append(model_dict)
        dataset_json_object["models"] = models_list
        datasets_json.append(dataset_json_object)
    return metrics, datasets_json


metrics, datasets_json = build_datasets_json(DATASETS, RESULTS, LEADERBOARD)

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
            metric_type = metrics[metrics['METRICS'].eq(
                preffered_metric)]['TYPE'].iloc[0]
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
                "dataset": dataset,
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


tasks_json = build_tasks_json(TASKS, DATASETS, RESULTS, METRICS, LEADERBOARD)

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

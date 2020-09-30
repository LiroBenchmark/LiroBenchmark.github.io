import json
import pandas as pd
import numpy as np
from itertools import groupby
import re
import logging
from argparse import ArgumentParser
import datetime
import functools


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


def read_excel(file_name, sheet_name):
    """Imports the data from the specified file and sheet into a DataFrame.

    Parameters
    ----------
    file_name: string
        The name of the Excel file.
    sheet_name: string
        The name of the sheet from where to load data.

    Returns
    -------
    pandas.DataFrame
        The DataFrame containing the sheet data.
    """
    df = pd.read_excel(file_name, sheet_name=sheet_name)
    return df.replace(np.nan, '', regex=True)


def save_json(data, file_name, encoding="utf8", indent=4):
    """Writes the data to the json file specified by file_name.

    Parameters
    ----------
    data: object
        The data to write in json format.
    file_name: string
        The name of the file where to write data.
    encoding:string, optional
        The encoding of the output file.
        Default is 'utf8'.
    indent:int, optional
        The indent of the output json.
        Default is 4.
    """
    with open(file_name, mode="w", encoding=encoding) as f:
        json.dump(data, f, indent=indent)


class ChartDataBuilder(object):
    """Builds the data for displaying dataset results in a chart.

    """
    def __init__(self, models, date_format="%b '%y"):
        """Creates a new instance of ChartDataBuilder.

        Parameters
        ----------
        models: list of dict
            The collection of dataset models with their results.
        date_format: string, optional
            The format in which to display dates in the horizontal axis.
            Default value is `%b '%y` which displays three-character month
            name and two digit year separated by apostrophe.
            Example: September 10, 2020 => Sep '20
        """
        super(ChartDataBuilder, self).__init__()
        self.models = models
        self.date_format = date_format

    def build_display_range(self):
        """Builds the list of ticks for the horizontal axis of the chart.

        Returns
        -------
        list of strings
            The list of ticks in the format specified by `date_format` field.
        """
        dates = functools.reduce(self._accumulate_dates, self.models, set())
        self._expand_dates(dates)
        dates = sorted(dates)
        return [d.strftime(self.date_format) for d in dates]

    def build_data_points(self):
        """Builds the list of chart data points.

        Returns
        -------
        list of dict
            The list of data points.
        """
        data_points = []
        for m in self.models:
            submission_date = self._parse_submission_date(m)
            submission_date = submission_date.strftime(self.date_format)
            model = {
                "model": m['model'],
                "submission_date": submission_date,
            }
            for metric, score in m['results'].items():
                model[metric] = score
            data_points.append(model)
        return data_points

    def _expand_dates(self, dates):
        """Adds one date before the minimum and one after the maximum.

        Parameters
        ----------
        dates: set of dates
            The dates to expand.
        """
        current_month = datetime.date.today().replace(day=1)
        min_date = min(dates) if len(dates) > 0 else current_month
        year = min_date.year - 1 if min_date.month == 1 else min_date.year
        min_date = min_date.replace(year=year, month=min_date.month - 1)
        dates.add(min_date)

        max_date = max(dates) if len(dates) > 0 else current_month
        year = max_date.year + 1 if max_date.month == 12 else max_date.year
        dates.add(max_date.replace(year=year, month=max_date.month + 1))

    def _accumulate_dates(self, accumulator, model):
        """Adds the submission date of the model to the accumulator
           and returns the accumulator.

        Parameters
        ----------
        accumulator: set
            The set of all the dates encountered so far.
        model: dict
            The model for which to parse the date and add to accumulator.

        Returns
        -------
        set
            The set of all distinct dates.
        """
        date = self._parse_submission_date(model)
        accumulator.add(date)
        return accumulator

    def _parse_submission_date(self, model):
        """Parses the sumbission_date property of the model to a proper date.

        Parameters
        ----------
        model: dict
            The information of the model.

        Returns
        -------
        datetime.date
            The submission date with day set to 1.
            Example: "2020-09" => date(year=2020, month=9, day=1)
        """
        year, month = model['submission_date'].split('-')
        date = datetime.date(int(year), int(month), 1)
        return date


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
            points_builder = ChartDataBuilder(dataset['models'])
            dataset['time_range'] = points_builder.build_display_range()
            dataset['data_points'] = points_builder.build_data_points()
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
                "submission_date": self._build_submission_date(model_info),
                "results": {
                    row['METRIC']: row['VALUE']
                    for _, row in model_results.iterrows()
                }
            }
            results.append(item)

        return results

    def _build_submission_date(self, model):
        """Builds the submission date from model row.

        Parameters
        ----------
        model: pandas.Series
            The row containing model info.

        Returns
        -------
        string
            The year and month of the submission.
        """
        date = datetime.date(int(model['DATE YEAR']), int(model['DATE MONTH']),
                             1)
        return date.strftime("%Y-%m")

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
            "license": row['LICENSE'] if row['LICENSE'] else "Not specified",
            "license_url": row['LICENSE URL'],
            "models": []
        }


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


class AreasDetailsBuilder(object):
    """Builds details for areas.

    """
    def __init__(self, datasets, tasks, results):
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
        """
        super(AreasDetailsBuilder, self).__init__()
        self.datasets = datasets
        self.tasks = tasks
        self.results = results

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
            "summary": self._build_task_summary(row['NAME'])
        } for _, row in self.tasks.iterrows()]

        result = []
        for area, tasks in groupby(task_details, lambda t: t["area"]):
            area_tasks = [{
                "id": t["id"],
                "name": t["name"],
                "summary": t["summary"]
            } for t in tasks]
            result.append({"name": area, "tasks": area_tasks})
        return result

    def _build_task_summary(self, task):
        """Counts the number of datasets and submissions for current task.

        Parameters
        ----------
        task: string
            The name of the current task.

        Returns
        -------
        dict
            The number of datasets for this task and sumbission count.
        """
        datasets = self.datasets[self.datasets['TASK'] == task]
        results = pd.merge(datasets,
                           self.results,
                           how='inner',
                           left_on='DATASET NAME',
                           right_on='DATASET')
        return {
            "dataset_count": int(datasets['DATASET NAME'].count()),
            "submission_count": int(results['MODEL'].nunique())
        }


def run(args):
    logging.info("Start extracting data from {}...".format(args.excel_file))
    leaderboard = read_excel(args.excel_file, args.leaderboard_sheet)
    results = read_excel(args.excel_file, args.results_sheet)
    datasets = read_excel(args.excel_file, args.datasets_sheet)
    tasks = read_excel(args.excel_file, args.tasks_sheet)
    metrics = read_excel(args.excel_file, args.metrics_sheet)

    logging.info("Building dataset details...")
    ds_builder = DatasetsDetailsBuilder(datasets, results, leaderboard)
    datasets_json = {"datasets": ds_builder.build_dataset_details()}

    logging.info("Building task details...")
    t_builder = TasksDetailsBuilder(tasks, datasets, results, metrics,
                                    leaderboard)
    tasks_json = {"tasks": t_builder.build_task_details()}

    logging.info("Building area details...")
    ab = AreasDetailsBuilder(datasets, tasks, results)
    homepage_json = {"areas": ab.build_area_details()}

    logging.info("Writing data...")
    save_json(datasets_json, args.dataset_details_file)
    save_json(tasks_json, args.task_details_file)
    save_json(homepage_json, args.area_details_file)
    logging.info("All done.")


def parse_arguments():
    parser = ArgumentParser()
    parser.add_argument('--excel-file',
                        help="The path to the input Excel file.",
                        default="LEADERBOARD.xlsx")
    parser.add_argument(
        '--area-details-file',
        help="The path to the output file containing area details.",
        default="homepage.json")
    parser.add_argument(
        '--task-details-file',
        help="The path to the output file containing task details.",
        default="tasks.json")
    parser.add_argument(
        '--dataset-details-file',
        help="The path to the output file containing dataset details.",
        default="datasets.json")
    parser.add_argument('--leaderboard-sheet',
                        help="The name of the leaderboard sheet.",
                        default="LEADERBOARD")
    parser.add_argument('--results-sheet',
                        help="The name of the results sheet.",
                        default="RESULTS")
    parser.add_argument('--datasets-sheet',
                        help="The name of the datasets sheet.",
                        default="DATASETS")
    parser.add_argument('--tasks-sheet',
                        help="The name of the tasks sheet.",
                        default="TASKS")
    parser.add_argument('--metrics-sheet',
                        help="The name of the metrics sheet.",
                        default="METRICS")
    return parser.parse_args()


if __name__ == '__main__':
    logging.basicConfig(format='%(asctime)s : %(levelname)s : %(message)s',
                        level=logging.INFO)
    args = parse_arguments()
    run(args)

import json
import pandas as pd
import numpy as np
from itertools import groupby
import re
import logging
from argparse import ArgumentParser
import datetime
import functools
import markdown as md
from pathlib import PurePath
import sys
from distutils.util import strtobool


class DatasetColumns:
    """Defines column name constants for DATASETS sheet from input file.
    """
    Task = 'TASK'
    DatasetName = 'DATASET NAME'
    DatasetLink = 'DATASET LINK'
    PreferredMetric = 'PREFERRED METRIC'
    License = 'LICENSE'
    LicenseURL = 'LICENSE URL'
    ShortDescription = 'SHORT DESCRIPTION FILE'
    LongDescription = 'LONG DESCRIPTION FILE'


class ResultsColumns:
    """Defines column name constants for RESULTS sheet from input file.
    """
    Model = 'MODEL'
    Dataset = 'DATASET'
    Metric = 'METRIC'
    Value = 'VALUE'


class TasksColumns:
    """Defines column name constants for TASKS sheet from input file.
    """
    Area = 'AREA'
    Name = 'NAME'
    Description = 'DESCRIPTION'
    DescriptionFile = 'DESCRIPTION FILE'


class LeaderboardColumns:
    """Defines column name constants for LEADERBOARD sheet from input file.
    """
    Dataset = 'DATASET'
    ModelName = 'MODEL NAME'
    PaperTitle = 'PAPER TITLE'
    PaperLink = 'PAPER LINK'
    SourceLink = 'SOURCE LINK'
    ExtraTrainingData = 'EXTRA TRAINING DATA'
    DateMonth = 'DATE MONTH'
    DateYear = 'DATE YEAR'
    ModelSize = 'MODEL SIZE'


class MetricsColumns:
    """Defines column name constants for METRICS sheet from input file.
    """
    Name = 'METRICS'
    Type = 'TYPE'
    Range = 'RANGE'
    Description = 'DESCRIPTION'


class AreasColumns:
    """Defines column name constants for AREAS sheet from the input file.
    """
    Name = "NAME"
    DisplayRank = "RANK"
    Remarks = "REMARKS"


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


def parse_description_file(directory, file_name, description_type):
    """Parses the contents of the descriptions file and returns contents as a HTML string.

    Parameters
    ----------
    directory: str
        The directory containing description files.
    file_name: str
        The name of the description file within the directory above.
    description_type: str
        The type of description (dataset or task); used for logging.

    Returns
    -------
    description: str
        The description as a HTML string.
        If `file_name` is `None` or empty, returns empty string.
    """
    if not file_name:
        return ''
    description_file = PurePath(directory, file_name)
    logging.info("Reading {} description from {}.".format(
        description_type, str(description_file)))
    with open(str(description_file), 'r') as f:
        text = f.read()
        description = md.markdown(text)
        return description


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
        if min_date.month == 1:
            year = min_date.year - 1
            month = 12
        else:
            year = min_date.year
            month = min_date.month - 1
        min_date = min_date.replace(year=year, month=month)
        dates.add(min_date)

        max_date = max(dates) if len(dates) > 0 else current_month
        if max_date.month == 12:
            year = max_date.year + 1
            month = 1
        else:
            year = max_date.year
            month = max_date.month + 1
        dates.add(max_date.replace(year=year, month=month))

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
    def __init__(self, datasets, results, leaderboard, tasks,
                 description_files_root):
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
        tasks: pandas.DataFrame
            The dataframe containing task data.
        description_files_root: str
            The directory containing dataset description files in markdown format.
        """
        super(DatasetsDetailsBuilder, self).__init__()
        self.datasets = datasets
        self.results = results
        self.leaderboard = leaderboard
        self.tasks = tasks
        self.description_files_root = description_files_root

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
            self._add_task_data(dataset)
            datasets.append(dataset)
        return datasets

    def _add_task_data(self, dataset):
        """Adds task-related properties to the dataset.

        Parameters
        ----------
        dataset: object
            The dataset to be augmented.
        """
        task_name = dataset['task']
        tasks = self.tasks[self.tasks[TasksColumns.Name] == task_name]
        if len(tasks) == 0:
            logging.error("Could not filter tasks for dataset {}.".format(
                dataset['dataset_name']))
        task = tasks.iloc[0]
        dataset['task_id'] = build_id_string(task[TasksColumns.Name])
        dataset['area'] = task[TasksColumns.Area]

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
        df = self.results[self.results[ResultsColumns.Dataset] == dataset_name]
        models = list(df[ResultsColumns.Model].unique())
        results = []
        for model in models:
            leaderboard = self.leaderboard
            model_info = leaderboard[
                (leaderboard[LeaderboardColumns.ModelName] == model)
                & (leaderboard[LeaderboardColumns.Dataset] == dataset_name)]
            if model_info.empty:
                err = "No rows in leaderboard for model '{}' and dataset '{}'"
                raise AssertionError(err.format(model, dataset_name))
            model_info = model_info.iloc[0]
            model_results = df[df[ResultsColumns.Model] == model]
            model_size = model_info[LeaderboardColumns.ModelSize]
            if model_size:
                model_size = '{0:,}'.format(int(model_size)).replace(',', ' ')
            extra_training_data = bool(strtobool(
                model_info[LeaderboardColumns.ExtraTrainingData]))
            item = {
                "model": model,
                "extra_training_data": extra_training_data,
                "paper_title": model_info[LeaderboardColumns.PaperTitle],
                "paper_link": model_info[LeaderboardColumns.PaperLink],
                "source_link": model_info[LeaderboardColumns.SourceLink],
                "submission_date": self._build_submission_date(model_info),
                "model_size": model_size,
                "results": {
                    row[ResultsColumns.Metric]: row[ResultsColumns.Value]
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
        month = int(model[LeaderboardColumns.DateMonth])
        year = int(model[LeaderboardColumns.DateYear])
        date = datetime.date(year, month, 1)
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
        df = self.results[self.results[ResultsColumns.Dataset] == dataset_name]
        metrics = list(df[ResultsColumns.Metric].unique())
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
        dataset_id = build_id_string(row[DatasetColumns.DatasetName])
        logging.info("Building dataset {}.".format(dataset_id))

        description = self._get_dataset_description(
            row, DatasetColumns.ShortDescription)
        dataset_info = self._get_dataset_description(
            row, DatasetColumns.LongDescription)
        if not dataset_info:
            message = "Could not parse long description for dataset {}."
            logging.warning(message.format(dataset_id))

        license = row[DatasetColumns.License] if row[
            DatasetColumns.License] else "Not specified"
        short_description = self._get_dataset_short_description(description)
        return {
            "task": row[DatasetColumns.Task],
            "id": dataset_id,
            "dataset_name": row[DatasetColumns.DatasetName],
            "dataset_description": description,
            "short_description": short_description,
            "dataset_info": dataset_info,
            "dataset_link": row[DatasetColumns.DatasetLink],
            "preferred_metric": row[DatasetColumns.PreferredMetric],
            "license": license,
            "license_url": row[DatasetColumns.LicenseURL],
            "models": []
        }

    def _get_dataset_short_description(self, html_description):
        """Extracts first paragraph of the description.

        Parameters
        ----------
        html_description: str
            The string containing dataset description in HTML format.

        Returns
        -------
        short_description: str
            The first paragraph of the HTML description.
        """
        index = html_description.find('</p>')
        if index <= 0:
            logging.warning(
                "Could not build short description from html string: {}.".
                format(html_description))
            return html_description

        return html_description[:index + len('</p>')]

    def _get_dataset_description(self, row, column):
        """Loads the descripton for the dataset from the description file.

        Parameters
        ----------
        row: pandas.Series
            The series containing dataset properties.
        column: str
            The name of the description column.

        Returns
        -------
        description: str
            The dataset description if available or an empty string.
        """
        dataset_id = build_id_string(row[DatasetColumns.DatasetName])
        description = parse_description_file(self.description_files_root,
                                             row[column], 'dataset')
        if not description:
            message = "Could not parse {} description for dataset {}."
            desc_type = 'short' if column == DatasetColumns.ShortDescription else 'long'
            logging.warning(message.format(dataset_id, desc_type))

        return description


class TasksDetailsBuilder(object):
    """Builds task details.

    """
    def __init__(self, tasks, datasets, results, metrics, leaderboard,
                 description_files_root):
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
        description_files_root: str
            The directory containing task description files in markdown format.
        """
        super(TasksDetailsBuilder, self).__init__()
        self.tasks = tasks
        self.datasets = datasets
        self.results = results
        self.metrics = metrics
        self.leaderboard = leaderboard
        self.description_files_root = description_files_root

    def build_task_details(self):
        """Builds the details of tasks in the format required for front-end.

        Returns
        -------
        list
            The list of tasks and their details.
        """
        tasks = []
        for _, row in self.tasks.iterrows():
            task_id = build_id_string(row[TasksColumns.Name])
            logging.info("Building task {}.".format(task_id))
            has_description_file = (TasksColumns.DescriptionFile in row.keys()
                                    ) and row[TasksColumns.DescriptionFile]
            if has_description_file:
                description = parse_description_file(
                    self.description_files_root,
                    row[TasksColumns.DescriptionFile], 'task')
            else:
                logging.info(
                    "Reading task description from '{}' column.".format(
                        TasksColumns.Description))
                description = row[TasksColumns.Description]

            datasets = self._build_task_datasets(row[TasksColumns.Name])
            tasks.append({
                "area": row[TasksColumns.Area],
                "id": task_id,
                "task_name": row[TasksColumns.Name],
                "task_description": description,
                "datasets": datasets
            })
        return tasks

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
        df = self.datasets[self.datasets[DatasetColumns.Task] == task_name]
        for _, row in df.iterrows():
            dataset = row[DatasetColumns.DatasetName]
            pref_metric = row[DatasetColumns.PreferredMetric]
            model = self._get_best_model(dataset, pref_metric)
            if not model:
                logging.warning(
                    "No best model found for dataset '{}' and metric '{}'.".
                    format(dataset, pref_metric))
                paper_title, paper_link, source_link = '', '', ''
                model = ''
            else:
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
        props = self.leaderboard[self.leaderboard[LeaderboardColumns.ModelName]
                                 == model].iloc[0]
        return (props[LeaderboardColumns.PaperTitle],
                props[LeaderboardColumns.PaperLink],
                props[LeaderboardColumns.SourceLink])

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
        results = results[(results[ResultsColumns.Dataset] == dataset)
                          & (results[ResultsColumns.Metric] == metric)]
        metric = self.metrics[self.metrics[MetricsColumns.Name] == metric]
        metric = metric.iloc[0]
        metric_type = metric[MetricsColumns.Type]
        sort_ascending = True if "high" in metric_type.lower() else False
        results = results.sort_values(by=ResultsColumns.Value,
                                      ascending=sort_ascending)
        if results.empty:
            return None
        model = results.iloc[0][ResultsColumns.Model]
        return model


class AreasDetailsBuilder(object):
    """Builds details for areas.

    """
    def __init__(self, datasets, tasks, results, areas):
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
        areas: pandas.DataFrame
            The dataframe containing area names and display ranks.
        """
        super(AreasDetailsBuilder, self).__init__()
        self.datasets = datasets
        self.tasks = tasks
        self.results = results
        self.area_ranks = {
            row[AreasColumns.Name]: row[AreasColumns.DisplayRank]
            for _, row in areas.iterrows()
        }
        self.area_remarks={
            row[AreasColumns.Name]: row[AreasColumns.Remarks] if len(row[AreasColumns.Remarks])>0 else None
            for _, row in areas.iterrows()
        }

    def build_area_details(self):
        """Builds the details of areas in the format required for front-end.

        Returns
        -------
        list
            The list of areas and their associated tasks.
        """
        task_details = []
        for _, row in self.tasks.iterrows():
            summary = self._build_task_summary(row[TasksColumns.Name])
            task_details.append({
                "area": row[TasksColumns.Area],
                "id": build_id_string(row[TasksColumns.Name]),
                "name": row[TasksColumns.Name],
                "summary": summary
            })
        task_details = sorted(task_details, key=self._get_area_display_rank)
        result = []
        for area, tasks in groupby(task_details, lambda t: t["area"]):
            area_tasks = [{
                "id": t["id"],
                "name": t["name"],
                "summary": t["summary"]
            } for t in tasks]
            result.append({"name": area,"remarks":self.area_remarks[area], "tasks": area_tasks})
        return result

    def _get_area_display_rank(self, task):
        """Returns the display rank of the task area.

        Parameters
        ----------
        task: dict
            The task for which to get the area display rank.

        Returns
        -------
        display_rank: int
            The area display rank if area is found in the areas field; sys.maxint otherwise.
        """
        area = task['area']
        if area not in self.area_ranks:
            return sys.maxint
        return self.area_ranks[area]

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
        datasets = self.datasets[self.datasets[DatasetColumns.Task] == task]
        results = pd.merge(datasets,
                           self.results,
                           how='inner',
                           left_on=DatasetColumns.DatasetName,
                           right_on=ResultsColumns.Dataset)
        return {
            "dataset_count": int(datasets[DatasetColumns.DatasetName].count()),
            "submission_count": int(results[ResultsColumns.Model].nunique())
        }


def run(args):
    logging.info("Start extracting data from {}...".format(args.excel_file))
    leaderboard = read_excel(args.excel_file, args.leaderboard_sheet)
    results = read_excel(args.excel_file, args.results_sheet)
    datasets = read_excel(args.excel_file, args.datasets_sheet)
    tasks = read_excel(args.excel_file, args.tasks_sheet)
    metrics = read_excel(args.excel_file, args.metrics_sheet)
    areas = read_excel(args.excel_file, args.areas_sheet)

    logging.info("Building dataset details...")
    ds_builder = DatasetsDetailsBuilder(datasets, results, leaderboard, tasks,
                                        args.dataset_descriptions_root)
    datasets_json = {"datasets": ds_builder.build_dataset_details()}

    logging.info("Building task details...")
    t_builder = TasksDetailsBuilder(tasks, datasets, results, metrics,
                                    leaderboard, args.task_descriptions_root)
    tasks_json = {"tasks": t_builder.build_task_details()}

    logging.info("Building area details...")
    ab = AreasDetailsBuilder(datasets, tasks, results, areas)
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
    parser.add_argument(
        '--areas-sheet',
        help="The name of the sheet containing area names and their order.",
        default="AREAS")
    parser.add_argument(
        '--dataset-descriptions-root',
        help=
        "The directory containing markdown files with dataset descriptions",
        default='../../datasets/')
    parser.add_argument(
        '--task-descriptions-root',
        help="The directory containing markdown files with task descriptions",
        default='../../tasks/')
    return parser.parse_args()


if __name__ == '__main__':
    logging.basicConfig(format='%(asctime)s : %(levelname)s : %(message)s',
                        level=logging.INFO)
    args = parse_arguments()
    run(args)

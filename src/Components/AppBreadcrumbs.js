import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import UrlBuilder from './UrlBuilder.js';
import taskData from '../data/tasks.json';
import datasetData from '../data/datasets.json';

class AppBreadcrumbs extends React.Component {
  constructor(props) {
    super(props);
    this.urlBuilder = new UrlBuilder();
    this.urlMap = {
      '/about': 'About',
      '/submit': 'Submit your model',
      '/terms-and-conditions': 'Terms and Conditions',
      '/privacy-statement': 'Privacy statement',
    };
  }

  getTaskName(url) {
    if (this.urlBuilder.isTaskUrl(url)) {
      const taskId = this.urlBuilder.getTaskId(url);
      const task = taskData.tasks.find((t) => t.id === taskId);
      return task.task_name;
    }

    if (this.urlBuilder.isDatasetUrl(url)) {
      const datasetId = this.urlBuilder.getDatasetId(url);
      const dataset = datasetData.datasets.find((d) => d.id === datasetId);
      return dataset.task;
    }

    return null;
  }

  getTaskUrl(url) {
    if (this.urlBuilder.isDatasetUrl(url)) {
      const datasetId = this.urlBuilder.getDatasetId(url);
      const dataset = datasetData.datasets.find((d) => d.id === datasetId);
      const task = taskData.tasks.find((t) => t.task_name === dataset.task);
      return this.urlBuilder.buildTaskUrl(task);
    }

    return null;
  }

  getDatasetName(url) {
    if (this.urlBuilder.isDatasetUrl(url)) {
      const datasetId = this.urlBuilder.getDatasetId(url);
      const dataset = datasetData.datasets.find((d) => d.id === datasetId);
      return dataset.dataset_name.replace(` - ${dataset.task}`, '').trim();
    }

    return null;
  }

  isOtherUrl(url) {
    const isHome = this.urlBuilder.isHomeUrl(url);
    const isTask = this.urlBuilder.isTaskUrl(url);
    const isDataset = this.urlBuilder.isDatasetUrl(url);
    return !(isHome || isTask || isDataset);
  }

  render() {
    const path = window.location.pathname;
    if (this.urlBuilder.isHomeUrl(path)) {
      return null;
    }
    return (
      <>
        <Breadcrumb>
          <Breadcrumb.Item href={UrlBuilder.basePath}>Home</Breadcrumb.Item>
          {this.urlBuilder.isTaskUrl(path) && <Breadcrumb.Item active>{this.getTaskName(path)}</Breadcrumb.Item>}
          {this.urlBuilder.isDatasetUrl(path) && (
            <>
              <Breadcrumb.Item href={this.getTaskUrl(path)}>{this.getTaskName(path)}</Breadcrumb.Item>
              <Breadcrumb.Item active>{this.getDatasetName(path)}</Breadcrumb.Item>
            </>
          )}
          {this.isOtherUrl(path) && (
            <Breadcrumb.Item active>{this.urlMap[this.urlBuilder.getCanonicalUrl(path)]}</Breadcrumb.Item>
          )}
        </Breadcrumb>
      </>
    );
  }
}

export default AppBreadcrumbs;

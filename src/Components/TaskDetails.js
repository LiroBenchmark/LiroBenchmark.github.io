import React from 'react';
import data from '../data/tasks.json';
import { CodeIcon } from '../assets/icons';
import UrlBuilder from './UrlBuilder';
import './TaskDetails.scss';

class TaskDetails extends React.Component {
  constructor(props) {
    super(props);
    this.taskId = props.match.params.id;
    this.task = data.tasks.find((t) => t.id === this.taskId);
    this.urlBuilder = new UrlBuilder();
  }

  renderPaper(paper_link, paper_title) {
    if (!paper_title) {
      return '';
    }

    if (paper_link) {
      return (
        <a href={paper_link} target="_blank" rel="noopener noreferrer">
          {paper_title}
        </a>
      );
    }
    return { paper_title };
  }

  renderModelName(model_name, dataset_id) {
    if (!model_name) {
      return '';
    }

    return <a href={this.urlBuilder.buildDatasetUrl({ id: dataset_id })}>{model_name}</a>;
  }

  renderSourceLink(source_link) {
    if (!source_link) {
      return '';
    }
    return (
      <a href={source_link} target="_blank" rel="noopener noreferrer">
        <CodeIcon />
      </a>
    );
  }

  renderModelRow(dataset) {
    const { dataset_name, dataset_id, model_name, paper_title, paper_link, source_link } = dataset;
    return (
      <tr key={model_name}>
        <td>
          <a href={this.urlBuilder.buildDatasetUrl({ id: dataset_id })}>{dataset_name}</a>
        </td>
        <td>{this.renderModelName(model_name, dataset_id)}</td>
        <td>{this.renderPaper(paper_link, paper_title)}</td>
        <td>{this.renderSourceLink(source_link)}</td>
      </tr>
    );
  }

  renderTaskDatasets(datasets) {
    if (!datasets || datasets.length === 0) {
      return <p>There are no submissions for this task.</p>;
    }

    return (
      <table className="table">
        <thead>
          <tr>
            <td>Dataset</td>
            <td>Best model</td>
            <td>Paper</td>
            <td>Code</td>
          </tr>
        </thead>
        <tbody>{datasets.map((ds) => this.renderModelRow(ds))}</tbody>
      </table>
    );
  }

  render() {
    const { datasets } = this.task;
    return (
      <div className="task-details">
        <h3>{this.task.task_name}</h3>
        <p className="task-description">{this.task.task_description}</p>
        <h4> Benchmarks</h4>
        {this.renderTaskDatasets(datasets)}
      </div>
    );
  }
}

export default TaskDetails;

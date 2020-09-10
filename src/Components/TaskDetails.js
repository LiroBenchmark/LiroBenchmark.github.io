import React from 'react';
import data from '../data/tasks.json';
import { CodeIcon } from '../assets/icons';
import { PaperIcon } from '../assets/icons';

class TaskDetails extends React.Component {
  constructor(props) {
    super(props);
    this.taskId = props.match.params.id;
    this.task = data.tasks.find((t) => t.id === this.taskId);
  }

  renderModelRow(dataset, modelName, paperTitle, paperLink, sourceLink) {
    return (
      <tr key={modelName}>
        <td>{dataset}</td>
        <td>{modelName}</td>
        <td>{paperTitle}</td>
        <td>
          {paperLink && (
            <a href={paperLink} target="_blank" rel="noopener noreferrer">
              <PaperIcon />
            </a>
          )}
        </td>
        <td>
          {sourceLink && (
            <a href={sourceLink} target="_blank" rel="noopener noreferrer">
              <CodeIcon />
            </a>
          )}
        </td>
        <td>
          <a href="#">See all models</a>
        </td>
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
            <td>Paper title</td>
            <td>Paper</td>
            <td>Code</td>
            <td>&nbsp;</td>
          </tr>
        </thead>
        <tbody>
          {datasets.map((ds) => {
            const { dataset, model_name, paper_title, paper_link, source_link } = ds;
            return this.renderModelRow(dataset, model_name, paper_title, paper_link, source_link);
          })}
        </tbody>
      </table>
    );
  }

  render() {
    const { datasets } = this.task;
    return (
      <div className="task-details">
        <h3>{this.task.task_name}</h3>
        <p className="task-description">{this.task.task_description}</p>
        {this.renderTaskDatasets(datasets)}
      </div>
    );
  }
}

export default TaskDetails;

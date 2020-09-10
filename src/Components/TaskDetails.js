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
            return (
              <tr key={model_name}>
                <td>{dataset}</td>
                <td>{model_name}</td>
                <td>{paper_title}</td>
                <td>
                  {paper_link && (
                    <a href={paper_link} target="_blank" rel="noopener noreferrer">
                      <PaperIcon />
                    </a>
                  )}
                </td>
                <td>
                  {source_link && (
                    <a href={source_link} target="_blank" rel="noopener noreferrer">
                      <CodeIcon />
                    </a>
                  )}
                </td>
                <td>
                  <a href="#">See all</a>
                </td>
              </tr>
            );
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

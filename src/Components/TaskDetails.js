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

  render() {
    const { submissions } = this.task;
    return (
      <div>
        <h3>{this.task.name}</h3>
        <p>{this.task.description}</p>

        {submissions && (
          <table className="table">
            <thead>
              <tr>
                <td>Model</td>
                <td>Dataset</td>
                <td>Score</td>
                <td>Code</td>
                <td>Paper</td>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => {
                const { modelId, datasetId, modelName, dataset, score } = submission;
                const modelLink = `/model/${modelId}`;
                const datasetLink = `/dataset/${datasetId}`;
                return (
                  <tr key={modelId}>
                    <td>
                      <a href={modelLink}>{modelName}</a>
                    </td>
                    <td>
                      <a href={datasetLink}>{dataset}</a>
                    </td>
                    <td>{score}</td>
                    <td>
                      {submission.code && (
                        <a href={submission.code} target="_blank" rel="noopener noreferrer">
                          <CodeIcon />
                        </a>
                      )}
                    </td>
                    <td>
                      {submission.paper && (
                        <a href={submission.paper} target="_blank" rel="noopener noreferrer">
                          <PaperIcon />
                        </a>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default TaskDetails;

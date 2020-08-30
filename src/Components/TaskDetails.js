import React from 'react';
import data from '../data/tasks.json';

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
          <table className="table table-striped">
            <thead>
              <tr>
                <td>Model</td>
                <td>Dataset</td>
                <td>Score</td>
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

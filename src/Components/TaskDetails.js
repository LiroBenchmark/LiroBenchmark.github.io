import React from 'react';
import data from '../data/tasks.json';

class TaskDetails extends React.Component{
    constructor(props){
        super(props);
        this.taskId = props.match.params.id;
        this.task = data.tasks.find(t=>{
            return t.id === this.taskId;
        });
    }

    render(){
        return(
            <>
              <h3>{this.task.name}</h3>
              <p>{this.task.description}</p>
              {this.task.submissions &&
              <table className="table table-striped">
                <thead>
                  <tr>
                    <td>Model</td>
                    <td>Dataset</td>
                    <td>Score</td>
                  </tr>
                </thead>
                <tbody>
                  {this.task.submissions.map(s=>{
                      const modelLink = '/model/' + s.modelId;
                      const datasetLink = '/dataset/' + s.datasetId;
                      return(
                          <tr>
                            <td>
                              <a href={modelLink}>{s.modelName}</a>
                            </td>
                            <td>
                              <a href={datasetLink}>{s.dataset}</a>
                            </td>
                            <td>
                              {s.score}
                            </td>
                          </tr>
                      );
                  })}
                </tbody>
              </table>
              }
            </>
        );
    };
}

export default TaskDetails;

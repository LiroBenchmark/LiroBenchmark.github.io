import React from 'react';

class TaskTile extends React.Component{
    render(){
      const { id, name, submissions, datasets } = this.props.itemData;
      return(
        <div className="task-tile">
          <a href={`/task/${id}`}>
            <div>
                <div className="task-name tile-col">
                <div className="task-logo" />
                  <p>{name}</p>
                </div>
              </div>
              <hr/>
              <div className="task-summary">
                <ul>
                  <li>{submissions ? submissions : "No"} submissions</li>
                  <li>{datasets ? datasets : "No"} datasets</li>
                </ul>
              </div>
          </a>
        </div>
      );
    }
}

export default TaskTile;

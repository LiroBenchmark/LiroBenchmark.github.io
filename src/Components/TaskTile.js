import React from 'react';

class TaskTile extends React.Component{
    render(){
        const data = {
            href:"/task/"+this.props.id,
            name:this.props.name
        };
        return(
	    <div className="col-md4 task-tile">
	      <a href={data.href}>
	        <div className="task-name">
	          <span>{data.name}</span>
    	        </div>
                <hr/>
                <div className="task-summary">
                  <ul>
                    <li>10 submissions</li>
                    <li>2 datasets</li>
                  </ul>
                </div>
	      </a>
	    </div>
        );
    }
}

export default TaskTile;

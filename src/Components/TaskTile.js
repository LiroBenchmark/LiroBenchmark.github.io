import React from 'react';

class TaskTile extends React.Component{
    render(){
        const data = {
            href: "/task/"+this.props.id,
            name: this.props.name,
            submissions: this.props.submissions,
            datasets: this.props.datasets
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
                    <li>{data.submissions ? data.submissions : "No"} submissions</li>
                    <li>{data.datasets ? data.datasets : "No"} datasets</li>
                  </ul>
                </div>
	      </a>
	    </div>
        );
    }
}

export default TaskTile;

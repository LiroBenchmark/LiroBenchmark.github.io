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
	        <div className="row">
                  <div className="col-xs-4 tile-col">
                    <div className="task-logo">
                    </div>
                  </div>
                  <div className="col-xs-8 task-name tile-col">
	            {data.name}
                  </div>
    	        </div>
                <hr/>
                <div className="row task-summary">
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

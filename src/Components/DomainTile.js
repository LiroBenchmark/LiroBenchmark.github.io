import React from 'react';
import TaskTile from './TaskTile.js';

const DisplayedTasks = 5;

class DomainTile extends React.Component{
    render(){
        const data = {
            name: this.props.name,
            tasks: this.props.tasks,
            href: "/domain/" + this.props.id
        };
        return(
            <div className="row domain-tile">
              <div className="col-md-12 domain-name">
                  <h4>
                    {data.name}
                  </h4>
              </div>
              <div className="row task-tiles">
                {data.tasks.slice(0, DisplayedTasks).map(t=>{
                    return(<TaskTile id={t.id} name={t.name} description={t.description} submissions={t.submissions} datasets={t.datasets} />);
                })}
              </div>
              {
                  data.tasks.length > DisplayedTasks &&
                      <div className="col-md-12 domain-tasks">
                        <a href={data.href}>See all {data.tasks.length} tasks</a>
                      </div>
                  }
            </div>
        );
    }
}

export default DomainTile;

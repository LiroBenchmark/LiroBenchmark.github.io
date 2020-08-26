import React from 'react';
import TaskTile from './TaskTile.js';

class DomainTile extends React.Component{
    render(){
        console.log(this.props);
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
                {data.tasks.map(t=>{
                    return(<TaskTile id={t.id} name={t.name} description={t.description} />);
                })}
              </div>
              <div className="col-md-12 domain-tasks">
                <a href={data.href}>See all tasks</a>
              </div>
            </div>
        );
    }
}

export default DomainTile;

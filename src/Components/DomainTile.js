import React from 'react';
import TaskTile from './TaskTile.js';

const maxVisibleTaks = 5;

class DomainTile extends React.Component{
    render(){
        const data = {
            name: this.props.name,
            tasks: this.props.tasks,
            href: `/domain/${this.props.id}`
        };

        const maxItems = data.tasks.slice(0, maxVisibleTaks)

        return(
            <div className="row domain-tile">
              <div className="col-md-12 domain-name">
                  <h4>
                    {data.name}
                  </h4>
              </div>
              <div className="task-tiles">
                {maxItems.map(currentItem => <TaskTile key={currentItem.id} itemData={currentItem} />)}
              </div>
              {
                data.tasks.length > maxVisibleTaks &&
                    <div className="col-md-12 domain-tasks">
                        <a href={data.href}>See all {data.tasks.length} tasks</a>
                    </div>
                  }
            </div>
        );
    }
}

export default DomainTile;

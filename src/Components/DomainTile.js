import React, { Component } from 'react';
import data from '../data/areas.json';

const maxVisibleTaks = 5;

class DomainTile extends Component {
  renderDomainTasks(domainTask) {
    const { id, name, submissions, datasets } = domainTask;
    return (
      <div className="task-tile" key={id}>
        <a href={`/ro_benchmark_leaderboard/task/${id}`}>
          <div>
            <div className="task-name tile-col">
              <div className="task-logo" />
              <p>{name}</p>
            </div>
          </div>
          <hr />
          <div className="task-summary">
            <ul>
              <li>{submissions || 'No'} submissions</li>
              <li>{datasets || 'No'} datasets</li>
            </ul>
          </div>
        </a>
      </div>
    );
  }

  renderDataItem(currentDomain) {
    const { domain, id, tasks } = currentDomain;
    const maxItems = tasks.slice(0, maxVisibleTaks);

    return (
      <div className="domain-tile" key={id}>
        <div className="domain-name">
          <h4>{domain}</h4>
        </div>
        <div className="task-tiles">{maxItems.map((currentTask) => this.renderDomainTasks(currentTask))}</div>
        {tasks.length > maxVisibleTaks && (
          <div className="domain-tasks">
            <a href={`/domain/${id}`}>See all {tasks.length} tasks</a>
          </div>
        )}
      </div>
    );
  }

  render() {
    const { domains } = data;
    return domains.map((currentDomain) => this.renderDataItem(currentDomain));
  }
}

export default DomainTile;

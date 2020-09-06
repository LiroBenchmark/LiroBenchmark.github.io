import React from 'react';
import { Collapse } from 'react-collapse';
import data from '../data/areas.json';
import './Homepage.scss';

class Homepage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeArea: null,
    };
  }

  updateactiveArea(name) {
    const { activeArea } = this.state;
    this.setState({
      activeArea: name !== activeArea ? name : null,
    });
  }

  renderAreaTask(task) {
    return (
      <div className="task-tile" key={task.name}>
        <div className="task-data">
          <table>
            <tbody>
              <tr>
                <td>Name</td>
                <td> {task.name}</td>
              </tr>
              <tr>
                <td>Dataset:</td>
                <td>{task.dataset}</td>
              </tr>
              <tr>
                <td>Submissions: </td>
                <td>{task.submissions}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  renderArea(area) {
    const { activeArea } = this.state;
    const { tasks, name } = area;

    const isTileOpened = activeArea === name;

    return (
      <div className="tile-wrapper">
        <div onClick={() => this.updateactiveArea(name)} className="collapse-trigger">
          <h4>{area.name}</h4>
        </div>
        <Collapse isOpened={isTileOpened}>
          <div className="task-wrapper">
            {tasks.map((currentTask) => this.renderAreaTask(currentTask))}
            <div className="clear" />
          </div>
        </Collapse>
      </div>
    );
  }

  render() {
    const { areas } = data;
    return areas.map((area) => this.renderArea(area));
  }
}

export default Homepage;

import React from 'react';
import { Collapse } from 'react-collapse';
import data from '../data/homepage.json';
import './Homepage.scss';
import UrlBuilder from './UrlBuilder.js';
import bannerLogo from '../assets/logo-banner.png';

class Homepage extends React.Component {
  constructor(props) {
    super(props);

    this.urlBuilder = new UrlBuilder();
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

  renderDataset(dataset) {
    return (
      <tr key={dataset.dataset}>
        <td>{dataset.dataset}</td>
        <td>{dataset.submission_count}</td>
      </tr>
    );
  }

  renderTaskSubmissions(task) {
    if (!task.summary) {
      return <span>No submissions</span>;
    }
    const { summary } = task;
    return (
      <table>
        <tbody>
          <tr>
            <td>{summary.dataset_count}</td>
            <td>{summary.dataset_count === 1 ? 'dataset' : 'datasets'}</td>
          </tr>
          <tr>
            <td>{summary.submission_count}</td>
            <td>{summary.submission_count === 1 ? 'submission' : 'submissions'}</td>
          </tr>
        </tbody>
      </table>
    );
  }

  renderAreaTask(task) {
    return (
      <a href={this.urlBuilder.buildTaskUrl(task)} className="task-tile-link">
        <div className="task-tile" key={task.name}>
          <h5>{task.name}</h5>
          <div className="task-data">{this.renderTaskSubmissions(task)}</div>
        </div>
      </a>
    );
  }

  renderArea(area) {
    const { activeArea } = this.state;
    const { tasks, name } = area;

    const isTileOpened = activeArea === name;

    return (
      <div key={area.name} className="tile-wrapper">
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
    if (!this.state.activeArea) {
      const defaultArea = areas[0];
      this.setState({ activeArea: defaultArea.name });
    }
    return (
      <>
        <div className="banner">
          <div className="logo">
            <img src={bannerLogo} alt="LiRo benchmark" />
          </div>
          <div className="intro">
            <p>
              LiRo (<em>Li</em>mba <em>Ro</em>mână) provides a benchmark for Romanian language tasks.
            </p>
            <p>
              The project keeps track of performance of different published models on the datasets and tasks listed
              below. This allows easy comparison of different models and monitoring progress on these tasks and datasets
              over time.
            </p>
          </div>
        </div>
        {areas.map((area) => this.renderArea(area))}
      </>
    );
  }
}

export default Homepage;

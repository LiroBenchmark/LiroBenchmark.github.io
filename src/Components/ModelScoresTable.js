import React from 'react';
import { FaSortUp, FaSortDown, FaSort } from 'react-icons/fa';
import './ModelScoresTable.scss';
import { CodeIcon, CheckIcon, CrossIcon } from '../assets/icons';

class ModelScoresTable extends React.Component {
  constructor(props) {
    super(props);
    this.models = props.models;
    this.metrics = props.metrics;
    this.state = {
      sortDirection: 'default',
      sortBy: 'default',
    };

    this.onSort = this.onSort.bind(this);
    this.sortFunction = this.sortFunction.bind(this);
  }

  onSort(metric) {
    const { sortDirection } = this.state;
    let nextSortDirection;
    if (sortDirection === 'default') {
      nextSortDirection = 'descending';
    }
    if (sortDirection === 'descending') {
      nextSortDirection = 'ascending';
    }
    if (sortDirection === 'ascending') {
      nextSortDirection = 'default';
    }

    this.setState({
      sortDirection: nextSortDirection,
      sortBy: metric,
    });
  }

  sortFunction(a, b) {
    const { sortDirection, sortBy } = this.state;
    let valA = a.results[sortBy];
    let valB = b.results[sortBy];

    if (sortDirection === 'ascending') {
      return valA - valB;
    }

    if (sortDirection === 'descending') {
      return valB - valA;
    }

    return 0;
  }

  renderModel(model) {
    return (
      <tr>
        <td>{model.model}</td>
        {this.metrics.map((m) => {
          return <td>{model.results[m]}</td>;
        })}
        <td className="td-extra-training-data">{model.extra_training_data ? <CheckIcon /> : <CrossIcon />}</td>
        <td>{model.model_size}</td>
        <td>
          <a href={model.paper_link} target="_blank" rel="noopener noreferrer">
            {model.paper_title}
          </a>
        </td>
        <td>
          {model.source_link && (
            <a href={model.source_link} target="_blank" rel="noopener noreferrer">
              <CodeIcon />
            </a>
          )}
        </td>
        <td>{model.submission_date}</td>
      </tr>
    );
  }

  renderSortButton() {
    const { sortDirection } = this.state;
    if (sortDirection === 'ascending') {
      return <FaSortUp />;
    }
    if (sortDirection === 'descending') {
      return <FaSortDown />;
    }
    return <FaSort />;
  }

  render() {
    return (
      <table className="table dataset-details">
        <thead>
          <tr>
            <td>Model</td>
            {this.metrics.map((m) => (
              <td>
                {m}
                <button type="button" onClick={() => this.onSort(m)}>
                  {this.renderSortButton()}
                </button>
              </td>
            ))}
            <td>Extra training data</td>
            <td>Model size</td>
            <td>Paper</td>
            <td>Code</td>
            <td>Submitted</td>
          </tr>
        </thead>
        <tbody>{[...this.models].sort(this.sortFunction).map((m) => this.renderModel(m))}</tbody>
      </table>
    );
  }
}

export default ModelScoresTable;

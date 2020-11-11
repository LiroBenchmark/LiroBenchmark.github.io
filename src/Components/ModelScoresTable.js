import React from "react";
import "./ModelScoresTable.scss";
import { CodeIcon } from "../assets/icons";
import { CheckIcon } from "../assets/icons";
import { CrossIcon } from "../assets/icons";

class ModelScoresTable extends React.Component {
  constructor(props) {
    super(props);
    this.models = props.models;
    this.metrics = props.metrics;
    this.state = {
      sortDirection: "descending",
      sortBy: "default",
    };

    this.onSort = this.onSort.bind(this);
  }

  onSort(metric) {
    const { sortDirection } = this.state;
    let nextSortDirection =
      sortDirection === "descending" ? "ascending" : "descending";
    this.setState({
      sortDirection: nextSortDirection,
      sortBy: metric,
    });
  }

  renderModel(model) {
    return (
      <tr>
        <td>{model.model}</td>
        {this.metrics.map((m) => {
          return <td>{model.results[m]}</td>;
        })}
        <td className="td-extra-training-data">
          {model.extra_training_data ? <CheckIcon /> : <CrossIcon />}
        </td>
        <td>{model.model_size}</td>
        <td>
          <a href={model.paper_link} target="_blank" rel="noopener noreferrer">
            {model.paper_title}
          </a>
        </td>
        <td>
          {model.source_link && (
            <a
              href={model.source_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <CodeIcon />
            </a>
          )}
        </td>
        <td>{model.submission_date}</td>
      </tr>
    );
  }

  render() {
    return (
      <table className="table dataset-details">
        <thead>
          <tr>
            <td>Model</td>
            {this.metrics.map((m) => (
              <td>{m}</td>
            ))}
            <td>Extra training data</td>
            <td>Model size</td>
            <td>Paper</td>
            <td>Code</td>
            <td>Submitted</td>
          </tr>
        </thead>
        <tbody>{this.models.map((m) => this.renderModel(m))}</tbody>
      </table>
    );
  }
}

export default ModelScoresTable;

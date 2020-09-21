import React, { Component } from 'react';
import data from '../data/datasets.json';
import ScatterPlot from './ScatterPlot';
class PlotBuilder extends Component {
  constructor(props) {
    super(props);
    this.datasetId = props.datasetId;
    this.dataset = data.datasets.find((ds) => ds.id === this.datasetId);
    this.state = { metric: this.dataset.preferred_metric };
    this.handleSelectedMetricChange = this.handleSelectedMetricChange.bind(this);
  }

  handleSelectedMetricChange(e) {
    console.log(`Setting display metric to ${e.target.value}`);
    this.setState({ metric: e.target.value });
  }

  render() {
    console.log(`PlotBuilder render() with metric=${this.state.metric}.`);
    return (
      <>
        <ScatterPlot metric={this.state.metric} />
        <div className="input-group">
          <div className="input-group-prepend">
            <label className="input-group-text" htmlFor="metrics">
              View scores for:
            </label>
          </div>
          <select
            className="custom-select"
            name="metrics"
            defaultValue={this.dataset.preferred_metric}
            onChange={this.handleSelectedMetricChange}
          >
            {this.dataset.metrics.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </>
    );
  }
}

export default PlotBuilder;

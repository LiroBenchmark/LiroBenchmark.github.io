import React, { Component } from 'react';
import ScatterPlot from './ScatterPlot';

class PlotBuilder extends Component {
  constructor(props) {
    super(props);
    this.dataset = props.dataset;
    this.handleSelectedMetricChange = this.handleSelectedMetricChange.bind(this);
    this.canvas = React.createRef();
    this.onWindowResize = this.onWindowResize.bind(this);
    this.state = {
      timeRange: this.dataset.time_range,
      dataPoints: this.buildDataPoints(this.dataset.preferred_metric),
      width: undefined,
      height: undefined,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize);
    this.onWindowResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  buildDataPoints = (metric) =>
    this.dataset.data_points.map((p) => ({
      model: p.model,
      submissionDate: p.submission_date,
      score: p[metric],
    }));

  onWindowResize() {
    const canvas = this.canvas.current;
    const bounds = canvas.getBoundingClientRect();
    this.setState({ width: bounds.width, height: bounds.height });
  }

  handleSelectedMetricChange(e) {
    const metric = e.target.value;
    if (!metric) return;
    this.setState({
      dataPoints: this.buildDataPoints(metric),
    });
  }

  render() {
    return (
      <>
        <div ref={this.canvas} className="canvas">
          <ScatterPlot
            timeRange={this.state.timeRange}
            dataPoints={this.state.dataPoints}
            width={this.state.width}
            height={this.state.height}
          />
        </div>
        <div id="select-metric-group" className="input-group input-group-sm">
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

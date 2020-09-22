import React, { Component } from "react";

import ScatterPlot from "./ScatterPlot";
const submissionDates = [
  "Dec '19",
  "Jan '20",
  "Feb '20",
  "Mar '20",
  "Apr '20",
  "May '20",
  "Jun '20",
  "Jul '20",
  "Aug '20",
  "Sep '20",
  "Oct '20",
  "Nov '20",
  "Dec '20",
  "Jan '21",
];
class PlotBuilder extends Component {
  constructor(props) {
    super(props);
    this.dataset = props.dataset;
    this.handleSelectedMetricChange = this.handleSelectedMetricChange.bind(
      this
    );
    this.canvas = React.createRef();
    this.onWindowResize = this.onWindowResize.bind(this);
    this.dataset.dataPoints = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
      (i) => {
        return {
          model: "Model number " + i,
          submission_date: submissionDates[i],
          F1: Math.round(Math.random() * 100) / 100,
          PRECISION: Math.round(Math.random() * 100) / 100,
          RECALL: Math.round(Math.random() * 100) / 100,
          XYZ: Math.round(Math.random() * 100) / 100,
        };
      }
    );
    this.dataset.timeRange = submissionDates;
    this.state = {
      timeRange: this.dataset.timeRange,
      dataPoints: this.buildDataPoints(this.dataset.preferred_metric),
      width: undefined,
      height: undefined,
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.onWindowResize);
    this.onWindowResize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onWindowResize);
  }

  buildDataPoints(metric) {
    return this.dataset.dataPoints.map((p) => {
      return {
        model: p.model,
        submissionDate: p.submission_date,
        score: p[metric],
      };
    });
  }
  onWindowResize() {
    const canvas = this.canvas.current;
    const bounds = canvas.getBoundingClientRect();
    this.setState({ width: bounds.width, height: bounds.height });
  }
  handleSelectedMetricChange(e) {
    console.log(`Setting display metric to ${e.target.value}`);
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

import React, { Component } from "react";
import {
  select,
  scaleLinear,
  scalePoint,
  extent,
  axisLeft,
  axisBottom,
  format,
  pointer,
} from "d3";
import data from "../data/datasets.json";
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

const points = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => {
  return {
    model: "Model number " + i,
    submission_date: submissionDates[i],
    F1: Math.round(Math.random() * 100) / 100,
    PRECISION: Math.round(Math.random() * 100) / 100,
    RECALL: Math.round(Math.random() * 100) / 100,
    XYZ: Math.round(Math.random() * 100) / 100,
  };
});

class ScatterPlot extends Component {
  constructor(props) {
    super(props);
    this.datasetId = props.datasetId;
    this.dataset = data.datasets.find((ds) => ds.id === this.datasetId);
    this.state = { metric: this.dataset.preferred_metric };
    this.handleSelectedMetricChange = this.handleSelectedMetricChange.bind(
      this
    );
  }
  handleSelectedMetricChange(e) {
    console.log(`Setting display metric to ${e.target.value}`);
    this.setState({ metric: e.target.value });
    this.drawScatterPlot(points);
  }

  componentDidMount() {
    this.drawScatterPlot(points);
  }
  drawScatterPlot(data) {
    const width = 1110;
    const height = 300;
    const circleRadius = 5;

    const canvas = select(this.refs.canvas);
    canvas.select("svg").remove();
    const svg = select(this.refs.canvas)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const title = "Task leaderboard";

    const xValue = (d) => d.submission_date;
    const xAxisLabel = "Submission date";
    console.log(`Drawing plot with metric ${this.state.metric}`);
    const yValue = (d) => d[this.state.metric];
    const yAxisLabel = "Score";

    const margin = { top: 60, right: 40, bottom: 88, left: 150 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = scalePoint().domain(submissionDates).range([0, innerWidth]);

    const yScale = scaleLinear()
      .domain(extent(data, yValue))
      .range([innerHeight, 0])
      .nice();

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xAxis = axisBottom(xScale).tickSize(-innerHeight).tickPadding(15);

    const yAxis = axisLeft(yScale).tickSize(-innerWidth).tickPadding(10);

    const yAxisG = g.append("g").call(yAxis);
    yAxisG.selectAll(".domain").remove();

    yAxisG
      .append("text")
      .attr("class", "axis-label")
      .attr("y", -93)
      .attr("x", -innerHeight / 2)
      .attr("fill", "black")
      .attr("transform", `rotate(-90)`)
      .attr("text-anchor", "middle")
      .text(yAxisLabel);

    const xAxisG = g
      .append("g")
      .call(xAxis)
      .attr("transform", `translate(0,${innerHeight})`);

    xAxisG.select(".domain").remove();

    xAxisG
      .append("text")
      .attr("class", "axis-label")
      .attr("y", 75)
      .attr("x", innerWidth / 2)
      .attr("fill", "black")
      .text(xAxisLabel);

    const tooltip = select(this.refs.canvas)
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "10px");

    const mouseOver = (evt, data) => {
      return tooltip
        .style("opacity", 1)
        .html(`<b>${data.model}</b>: ${yValue(data)}`);
    };

    const mouseMove = (evt) => {
      return tooltip
        .style("left", evt.clientX + 10 + "px")
        .style("top", evt.clientY + "px");
    };

    const mouseLeave = (d) =>
      tooltip.transition().duration(200).style("opacity", 0);

    g.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cy", (d) => yScale(yValue(d)))
      .attr("cx", (d) => xScale(xValue(d)))
      .attr("r", circleRadius)
      .on("mouseover", mouseOver)
      .on("mousemove", mouseMove)
      .on("mouseleave", mouseLeave);

    g.append("text")
      .attr("class", "title")
      .attr("x", innerWidth / 2)
      .attr("y", -10)
      .attr("text-anchor", "middle")
      .text(title);
  }
  render() {
    return (
      <>
        <div ref="canvas" width="100%" height="30%"></div>
        <label htmlFor="metrics">View scores for:</label>
        <select
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
      </>
    );
  }
}
export default ScatterPlot;

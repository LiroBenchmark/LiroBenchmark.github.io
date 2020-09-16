import React, { Component } from 'react';
import { select, csv, scaleLinear, extent, axisLeft, axisBottom, format } from 'd3';

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => {
  return {
    model: 'Model number ' + i,
    submission_date: i,
    F1: Math.round(Math.random() * 100) / 100,
    PRECISION: Math.round(Math.random() * 100) / 100,
  };
});

class ScatterPlot extends Component {
  componentDidMount() {
    this.drawScatterPlot(data);
  }
  drawScatterPlot(data) {
    console.log(data);
    const scale = 20;
    const width = 1110;
    const height = 300;
    const circleRadius = 5;
    const svg = select(this.refs.canvas).append('svg').attr('width', width).attr('height', height);
    const title = 'Task leaderboard';

    const xValue = (d) => d.submission_date;
    const xAxisLabel = 'Submission date';

    const yValue = (d) => d.F1;
    const yAxisLabel = 'Score';

    const margin = { top: 60, right: 40, bottom: 88, left: 150 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = scaleLinear().domain(extent(data, xValue)).range([0, innerWidth]).nice();

    const yScale = scaleLinear().domain(extent(data, yValue)).range([innerHeight, 0]).nice();

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const xAxis = axisBottom(xScale).tickSize(-innerHeight).tickPadding(15);

    const yAxis = axisLeft(yScale).tickSize(-innerWidth).tickPadding(10);

    const yAxisG = g.append('g').call(yAxis);
    yAxisG.selectAll('.domain').remove();

    yAxisG
      .append('text')
      .attr('class', 'axis-label')
      .attr('y', -93)
      .attr('x', -innerHeight / 2)
      .attr('fill', 'black')
      .attr('transform', `rotate(-90)`)
      .attr('text-anchor', 'middle')
      .text(yAxisLabel);

    const xAxisG = g.append('g').call(xAxis).attr('transform', `translate(0,${innerHeight})`);

    xAxisG.select('.domain').remove();

    xAxisG
      .append('text')
      .attr('class', 'axis-label')
      .attr('y', 75)
      .attr('x', innerWidth / 2)
      .attr('fill', 'black')
      .text(xAxisLabel);

    g.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cy', (d) => yScale(yValue(d)))
      .attr('cx', (d) => xScale(xValue(d)))
      .attr('r', circleRadius);

    g.append('text')
      .attr('class', 'title')
      .attr('x', innerWidth / 2)
      .attr('y', -10)
      .attr('text-anchor', 'middle')
      .text(title);
  }
  render() {
    return <div ref="canvas" width="100%" height="30%"></div>;
  }
}
export default ScatterPlot;

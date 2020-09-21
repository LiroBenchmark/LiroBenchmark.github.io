import React, { Component } from 'react';
import { select, scaleLinear, scalePoint, extent, axisLeft, axisBottom } from 'd3';

class ScatterPlot extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { timeRange, dataPoints } = this.props;
    this.drawScatterPlot(timeRange, dataPoints);
  }

  componentDidUpdate() {
    const { timeRange, dataPoints } = this.props;
    this.drawScatterPlot(timeRange, dataPoints);
  }
  drawScatterPlot(xScaleDomain, dataPoints) {
    const width = 1110;
    const height = 300;
    const circleRadius = 5;

    const canvas = select(this.refs.canvas);
    canvas.select('svg').remove();
    const svg = select(this.refs.canvas).append('svg').attr('width', width).attr('height', height);

    const title = 'Task leaderboard';

    const xValue = (d) => d.submissionDate;
    const xAxisLabel = 'Submission date';
    const yValue = (d) => d.score;
    const yAxisLabel = 'Score';

    const margin = { top: 60, right: 40, bottom: 88, left: 150 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = scalePoint().domain(xScaleDomain).range([0, innerWidth]);

    const yScale = scaleLinear().domain(extent(dataPoints, yValue)).range([innerHeight, 0]).nice();

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

    const tooltip = select(this.refs.canvas)
      .append('div')
      .style('opacity', 0)
      .attr('class', 'tooltip')
      .style('background-color', 'white')
      .style('border', 'solid')
      .style('border-width', '1px')
      .style('border-radius', '5px')
      .style('padding', '10px');

    const mouseOver = (evt, data) => {
      return tooltip.style('opacity', 1).html(`<b>${data.model}</b>: ${yValue(data)}`);
    };

    const mouseMove = (evt) => {
      return tooltip.style('left', evt.clientX + 10 + 'px').style('top', evt.clientY + 'px');
    };

    const mouseLeave = (d) => tooltip.transition().duration(200).style('opacity', 0);

    g.selectAll('circle')
      .data(dataPoints)
      .enter()
      .append('circle')
      .attr('cy', (d) => yScale(yValue(d)))
      .attr('cx', (d) => xScale(xValue(d)))
      .attr('r', circleRadius)
      .on('mouseover', mouseOver)
      .on('mousemove', mouseMove)
      .on('mouseleave', mouseLeave);

    g.append('text')
      .attr('class', 'title')
      .attr('x', innerWidth / 2)
      .attr('y', -10)
      .attr('text-anchor', 'middle')
      .text(title);
  }
  render() {
    return (
      <>
        <div ref="canvas" width="100%" height="30%"></div>
      </>
    );
  }
}
export default ScatterPlot;

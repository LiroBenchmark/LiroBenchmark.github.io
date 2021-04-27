import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import data from '../data/datasets.json';
import './Datasets.scss';
import UrlBuilder from './UrlBuilder.js';

class Datasets extends React.Component {
  constructor(props) {
    super(props);
    this.urlBuilder = new UrlBuilder();
  }

  renderDataset(dataset) {
    return (
      <div className="row dataset-row">
        <div className="row dataset-title">
          <h2>
            <a href={this.urlBuilder.buildDatasetUrl(dataset)}>{dataset.dataset_name}</a>
          </h2>
        </div>
        <div className="row dataset-description">{ReactHtmlParser(dataset.dataset_description)}</div>
        <div className="row dataset-info">
          <ul>
            <li>
              <span>license:</span> {dataset.license}
            </li>
            <li>
              <span>submissions:</span> {dataset.models.length}
            </li>
            <li>
              <span>preferred metric:</span> {dataset.preferred_metric}
            </li>
          </ul>
        </div>
      </div>
    );
  }

  render() {
    return (
      <>
        <div className="container">
          <div className="row header-row">
            <h1>Datasets</h1>
            <p>
              LiRo Benchmark contains {data.datasets.length} datasets. If you would like to submit another dataset
              please send us an email at <a href="mailto:contact@eeml.eu">contact@eeml.eu</a>.
            </p>
          </div>
          {data.datasets.map((ds) => this.renderDataset(ds))}
        </div>
      </>
    );
  }
}

export default Datasets;

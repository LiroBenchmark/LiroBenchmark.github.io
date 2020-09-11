import React from 'react';
import data from '../data/datasets.json';
import { CodeIcon } from '../assets/icons';
import { PaperIcon } from '../assets/icons';
import UrlBuilder from './UrlBuilder';

class DatasetDetails extends React.Component {
  constructor(props) {
    super(props);
    this.datasetId = props.match.params.id;
    this.dataset = data.datasets.find((ds) => ds.id == this.datasetId);
    this.urlBuilder = new UrlBuilder();
  }

  renderModels() {
    var metrics = new Set();
  }

  render() {
    return (
      <>
        <h3>{this.dataset.dataset_name}</h3>
        <p>{this.dataset.dataset_description}</p>
        <table>
          <tbody>
            <tr>
              <th>Source</th>
              <td>
                <a href={this.dataset.dataset_link} target="_blank" rel="noopener noreferer">
                  {this.dataset.dataset_link}
                </a>
              </td>
            </tr>
            <tr>
              <th>Licence</th>
              <td>MIT</td>
            </tr>
          </tbody>
        </table>
        <hr />
        {this.renderModels()}
      </>
    );
  }
}

export default DatasetDetails;

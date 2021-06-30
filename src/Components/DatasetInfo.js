import React, { Component } from 'react';
import './DatasetInfo.scss';
import StarterCodeIcon from './StarterCodeIcon';

export class DatasetInfo extends Component {
  constructor(props) {
    super(props);
    const { dataset_link, license, license_url, starter_code } = props.dataset;
    this.datasetLink = dataset_link;
    this.datasetLicense = license;
    this.licenseUrl = license_url;
    this.starterCodeUrl = starter_code;
    this.state = {};
  }

  renderSourceRow() {
    return (
      <tr>
        <th>Source</th>
        <td>
          <a href={this.datasetLink} target="_blank" rel="noopener noreferrer">
            {this.datasetLink}
          </a>
        </td>
      </tr>
    );
  }

  renderLicenseRow() {
    return (
      <tr>
        <th>License</th>
        <td>
          {this.licenseUrl ? (
            <a href={this.licenseUrl} target="_blank" rel="noopener noreferrer">
              {this.datasetLicense}
            </a>
          ) : (
            this.datasetLicense
          )}
        </td>
      </tr>
    );
  }

  renderStarterCodeRow() {
    if (!this.starterCodeUrl) {
      return '';
    }

    return (
      <tr>
        <th>Starter code</th>
        <td>
          <StarterCodeIcon url={this.starterCodeUrl} />
        </td>
      </tr>
    );
  }

  render() {
    return (
      <table className="dataset-info">
        <tbody>
          {this.renderSourceRow()}
          {this.renderLicenseRow()}
          {this.renderStarterCodeRow()}
        </tbody>
      </table>
    );
  }
}

export default DatasetInfo;

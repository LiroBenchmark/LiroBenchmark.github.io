import React, { Component } from 'react';
import './DatasetInfo.scss';

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
          <a href={this.starterCodeUrl} target="_blank" rel="noopener noreferrer">
            {this.starterCodeUrl}
          </a>
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

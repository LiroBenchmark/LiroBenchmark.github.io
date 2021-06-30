import React, { Component } from 'react';
import UrlBuilder from './UrlBuilder';
import ContactEmail from './ContactEmail';
import StarterCodeIcon from './StarterCodeIcon';
import data from '../data/datasets.json';

export class StarterCode extends Component {
  constructor(props) {
    super(props);
    this.urlBuilder = new UrlBuilder();
  }

  renderDataset(dataset) {
    if (!dataset.starter_code) {
      return '';
    }
    return (
      <tr key={dataset.id}>
        <td>
          <a href={this.urlBuilder.buildDatasetUrl(dataset)}>{dataset.dataset_name}</a>
        </td>
        <td>
          <a href={this.urlBuilder.buildTaskUrl({ id: dataset.task_id })}>{dataset.task}</a>
        </td>
        <td>
          <StarterCodeIcon url={dataset.starter_code} />
        </td>
      </tr>
    );
  }

  render() {
    return (
      <>
        <div className="container">
          <div className="row header-row">
            <h1>Starter code</h1>
            <p>
              On this page you can see an overview of the datasets that provide starter code. If you would like to add
              another dataset or add starter code to an existing dataset please send us an email at <ContactEmail />.
            </p>
          </div>
          <div className="row">
            <table className="table rola-table">
              <thead>
                <tr>
                  <td>Dataset</td>
                  <td>Task</td>
                  <td>Starter code</td>
                </tr>
              </thead>
              <tbody>
                {data.datasets
                  .sort((a, b) => {
                    const ds_name_a = a.dataset_name;
                    const ds_name_b = b.dataset_name;
                    if (ds_name_a < ds_name_b) return -1;
                    if (ds_name_a > ds_name_b) return 1;
                    return 0;
                  })
                  .map((ds) => this.renderDataset(ds))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

export default StarterCode;

import React from 'react';

class DatasetDetails extends React.Component {
  constructor(props) {
    super(props);
    this.datasetId = props.match.params.id;
  }

  render() {
    return <p>Dataset {this.datasetId} details here...</p>;
  }
}

export default DatasetDetails;

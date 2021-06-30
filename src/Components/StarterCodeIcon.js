import React, { Component } from 'react';
import { FaFileCode } from 'react-icons/fa';

export class StarterCodeIcon extends Component {
  constructor(props) {
    super(props);
    this.url = props.url;
  }

  render() {
    if (!this.url) {
      return '';
    }

    return (
      <a href={this.url} target="_blank" rel="noopener noreferrer">
        <FaFileCode />
      </a>
    );
  }
}

export default StarterCodeIcon;

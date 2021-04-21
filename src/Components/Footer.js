import React from 'react';
import UrlBuilder from './UrlBuilder';
import './Footer.scss';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.urlBuilder = new UrlBuilder();
  }

  render() {
    return (
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-message">
            Contact us at <a href="mailto:contact@eeml.eu">contact@eeml.eu</a>.
          </div>
          <div className="footer-message">
            Follow us on <a href="https://twitter.com/EEMLcommunity">Twitter</a>.
          </div>
          <div className="footer-message">Logo design by Cristina Oneț.</div>
        </div>
      </footer>
    );
  }
}

export default Footer;

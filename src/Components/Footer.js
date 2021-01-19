import React from 'react';
import UrlBuilder from './UrlBuilder';
import './Footer.scss';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.urlBuilder = new UrlBuilder();
  }

  render = () => (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-message">
          Contact us at <a href="mailto:contact@eeml.eu">contact@eeml.eu</a>. Follow us on{' '}
          <a href="https://twitter.com/EEMLcommunity">Twitter</a>.
        </div>
        <div className="footer-space"> </div>
        <div className="footer-link">
          <a href={UrlBuilder.aboutPageUrl}>About</a>
        </div>
        <div className="footer-link">
          <a href={UrlBuilder.termsAndConditionsPageUrl}>Terms &amp; Conditions</a>
        </div>
        <div className="footer-link">
          <a href={UrlBuilder.privacyStatementPageUrl}>Privacy statement</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

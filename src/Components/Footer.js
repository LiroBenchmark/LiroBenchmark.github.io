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
      Contact us at <a href="mailto:contact@eeml.eu">contact@eeml.eu</a>. Follow us on{' '}
      <a href="https://twitter.com/EEMLcommunity">Twitter</a>.
      <div className="footer-links">
        <a href={UrlBuilder.aboutPageUrl}>About</a>
        <a href={UrlBuilder.termsPageUrl}>Legal</a>
      </div>
    </footer>
  );
}

export default Footer;

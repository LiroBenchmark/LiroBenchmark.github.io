import React from 'react';
import UrlBuilder from './UrlBuilder';
import ContactEmail from './ContactEmail';
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
            Contact us at <ContactEmail />.
          </div>
          <div className="footer-message">
            Follow us on <a href="https://twitter.com/RomaniaAi">Twitter</a>.
          </div>
          <div className="footer-message">
            Logo design by <a href="https://www.linkedin.com/in/cristina-one%C5%A3/">Cristina Oneț</a>.
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;

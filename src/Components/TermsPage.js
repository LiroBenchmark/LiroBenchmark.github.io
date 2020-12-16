import React from 'react';
import UrlBuilder from './UrlBuilder';

const TermsPage = () => (
  <>
    <h1 id="terms">
      <a href={UrlBuilder.termsAndConditionsPageUrl}>Terms and Conditions</a>
    </h1>
    <h1 id="privacy">Privacy notice</h1>
  </>
);

export default TermsPage;

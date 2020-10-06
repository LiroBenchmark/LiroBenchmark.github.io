import React from "react";
import UrlBuilder from "./UrlBuilder";
import "./Footer.scss";

const Footer = () => (
  <div className="footer">
    <div className="contact-info">Contact us at: noreply@email.com</div>
    <div className="legal-info">
      <a href={UrlBuilder.termsPageUrl}>Terms and Conditions</a>
    </div>
  </div>
);

export default Footer;

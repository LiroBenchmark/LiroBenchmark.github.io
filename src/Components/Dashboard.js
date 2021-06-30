import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Tasks from './Tasks';
import UrlBuilder from './UrlBuilder';
import TaskDetails from './TaskDetails';
import DatasetDetails from './DatasetDetails';
import AboutPage from './AboutPage';
import SubmitPage from './SubmitPage';
import TermsAndConditionsPage from './TermsAndConditionsPage';
import PrivacyStatementPage from './PrivacyStatementPage';
import Datasets from './Datasets';
import StarterCode from './StarterCode';

const Dashboard = (props) => {
  const { location } = props;
  return (
    <Switch location={location}>
      <Route exact path={UrlBuilder.aboutPageUrl} component={AboutPage} />
      <Route exact path={UrlBuilder.submitPageUrl} component={SubmitPage} />
      <Route exact path={UrlBuilder.taskUrlTemplate} component={TaskDetails} />
      <Route exact path={UrlBuilder.datasetUrlTemplate} component={DatasetDetails} />
      <Route exact path={UrlBuilder.datasetsPageUrl} component={Datasets} />
      <Route exact path={UrlBuilder.starterCodePageUrl} component={StarterCode} />
      <Route exact path={UrlBuilder.termsAndConditionsPageUrl} component={TermsAndConditionsPage} />
      <Route exact path={UrlBuilder.privacyStatementPageUrl} component={PrivacyStatementPage} />
      <Route path="/" component={Tasks} />
    </Switch>
  );
};

export default Dashboard;

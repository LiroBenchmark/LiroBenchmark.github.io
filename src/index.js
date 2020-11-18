import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import WebFont from 'webfontloader';
import App from './App';

WebFont.load({
  google: {
    families: ['Roboto:300,400,700', 'sans-serif'],
  },
});

ReactDOM.render(
  <BrowserRouter basename="/ro_benchmark_leaderboard">
    <Route path="/" component={App} />
  </BrowserRouter>,
  document.getElementById('root'),
);

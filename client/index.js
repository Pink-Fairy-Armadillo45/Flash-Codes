import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';
import styles from './scss/style.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// uncomment so that webpack can bundle styles


render(
  <Router>
   <App />
  </Router>,
  document.getElementById('root')
);

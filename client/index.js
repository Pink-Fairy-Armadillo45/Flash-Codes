import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';
import styles from './scss/style.scss';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from './store';

// uncomment so that webpack can bundle styles


render(
  <Provider store={store}>
  <Router>
   <App />
  </Router>
  </Provider>,
  document.getElementById('root')
);

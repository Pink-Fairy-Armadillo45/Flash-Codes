import React, { Component } from 'react';
import { BrowserRouter, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import FlashcardsContainer from '../containers/FlashcardsContainer';
import OauthInfo from './OauthInfo';
import Login from '../components/Login';
const axios = require('axios');


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }


  render() {

    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={FlashcardsContainer} />
            {/* <Route exact path='/oauth-success' component={OauthInfo} /> */}
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import FlashcardsContainer from '../containers/FlashcardsContainer';
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
          <FlashcardsContainer />
      </div>
    );
  }
}

export default App;

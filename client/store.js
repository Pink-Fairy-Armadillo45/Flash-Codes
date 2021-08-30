/**
 * ************************************
 *
 * @module  store.js
 * @author
 * @date
 * @description Redux 'single source of truth'
 *
 * ************************************
 */

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'; //this was important to use in order to implement async requests to our database in actions.js
import reducers from './reducers/index';
//import { loadMarkets } from './actions/actions'; //this might be used in the future to load data for the user ref. unit 12 test
 
const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk)),
);
 
//  store.dispatch(loadMarkets());//this might be used in the future to load data for the user ref. unit 12 test
 
export default store;
 
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
 import thunk from 'redux-thunk';
 import reducers from './reducers/index';
 import { loadMarkets } from './actions/actions';
 
 const store = createStore(
   reducers,
   composeWithDevTools(applyMiddleware(thunk)),
 );
 
//  store.dispatch(loadMarkets());
 
 export default store;
 
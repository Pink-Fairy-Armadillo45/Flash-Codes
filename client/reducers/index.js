/**
 * ************************************
 *
 * @module  index.js
 * @author
 * @date
 * @description simply a place to combine reducers
 *
 * ************************************
 */

 import { combineReducers } from 'redux';
 import marketsReducer from './marketsReducer';
 
 export default combineReducers({
   markets: marketsReducer,
 });
 
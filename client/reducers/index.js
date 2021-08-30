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
import flashCodesReducer from './flashCodesReducer';
 
export default combineReducers({
  flashCodes: flashCodesReducer,
});
 
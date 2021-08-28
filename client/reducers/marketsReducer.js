/**
 * ************************************
 *
 * @module  marketsReducer
 * @author
 * @date
 * @description reducer for market data
 *
 * ************************************
 */

 import * as types from '../constants/actionTypes';

 const initialState = {
   totalMarkets: 0,
   totalCards: 0,
   marketList: [],
   newLocation: '',
   synced: true,
 };
 
 const marketsReducer = (state = initialState, action) => {
   switch (action.type) {
     case types.ADD_MARKET:
       return {
         ...state,
         marketList: state.marketList.concat({
           location: action.payload,
           cards: 0,
         }),
         totalMarkets: state.totalMarkets + 1,
         newLocation: '',
         synced: false,
       };
 
     case types.UPDATE_LOCATION:
       return {
         ...state,
         newLocation: action.payload,
       };
 
     case types.ADD_CARD: {
       const newMarketList = state.marketList.map((market, idx) => {
         if (idx === action.payload) {
           return {
             ...market,
             cards: market.cards + 1,
           };
         }
         return market;
       });
 
       return {
         ...state,
         totalCards: state.totalCards + 1,
         marketList: newMarketList,
         synced: false,
       };
     }
 
     case types.DELETE_CARD: {
       const newMarketList = state.marketList.map((market, idx) => {
         if (idx === action.payload) {
           return {
             ...market,
             cards: market.cards - 1,
           };
         }
         return market;
       });
 
       return {
         ...state,
         totalCards: state.totalCards - 1,
         marketList: newMarketList,
       };
     }
 
     case types.SYNC_MARKETS:
       return {
         ...state,
         synced: true,
       };
 
     case types.LOAD_MARKETS:
       return {
         ...state,
         totalMarkets: action.payload.length,
         totalCards: action.payload.reduce((res, m) => res + m.cards, 0),
         marketList: action.payload,
       };
 
     default:
       return state;
   }
 };
 
 export default marketsReducer;
 
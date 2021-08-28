/**
 * ************************************
 *
 * @module  flashCodesReducer
 * @author
 * @date
 * @description reducer for market data
 *
 * ************************************
 */

 import * as types from '../constants/actionTypes';

 const initialState = {
   userID: null,
   totalCardsAnswered: 0,
   answeredRight: 0,
   answeredWrong: 0,
   answeredCardList:[],
   flashCardList:[],
   createdUserCards:[],
   chosenTopics:[]
 };
 
 const flashCodesReducer = (state = initialState, action) => {
   switch (action.type) {
     case types.ANSWERED_CORRECTLY: 
      const newAnsweredCardList  = [...state.answeredCardList]
      const newflashCardList =state.flashCardList 
      newAnsweredCardList.push(newflashCardList.slice(1,0))
      newflashCardList.shift()

       return {...state,
       totalCardsAnswered: state.totalCardsAnswered + 1,
       answeredWrong: state.answeredWrong + 1,
       AnsweredCardList:newAnsweredCardList,
       flashCardList: newflashCardList
       };
 
     case types.ANSWERED_INCORRECTLY:
      const newAnsweredCardList  = [...state.answeredCardList]
      const newflashCardList =state.flashCardList 
      newAnsweredCardList.push(newflashCardList.slice(1,0))
      newflashCardList.shift()

       return {...state,
        totalCardsAnswered: state.totalCardsAnswered + 1,
        totalCardsAnsweredCorrectly: state.answeredWrong + 1,
        AnsweredCardList:newAnsweredCardList,
        flashCardList: newflashCardList

       };
 
     case types.ADD_CREATED_USER_CARD: 
       return {
       };
     
 
     case types.ADD_FLASH_CARD_LIST: 
       return {

       };
     
 
     case types.GET_TOPICS_LIST:
        return{
          
        };
    
 
     case types.ADD_TO_TOPICS_LIST:
       return {

       };

     case types.REMOVE_ONE_TOPICS_LIST:
       return {

       };
 
     default:
       return state; 
      }
   }
 };
 
 export default flashCodesReducer;
 
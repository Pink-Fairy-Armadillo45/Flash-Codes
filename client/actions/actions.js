/**
 * ************************************
 *
 * @module  actions.js
 * @author
 * @date
 * @description Action Creators
 *
 * ************************************
 */

 import axios from 'axios';
 import * as types from '../constants/actionTypes';
 //increment total and answered corectly client side also make post request server side to make changes
 export const ANSWERED_CORRECTLY = (userID, flashCardID) => (dispatch) => {
   axios.post('/cards/answeredCorrectTotal', {userId: userID, flashCardID: flashCardID})
      .then(({status}) =>{
        if(status === 200){
          dispatch({
               type: types.ANSWERED_CORRECTLY,
                payload: flashCardID
          })
        }
      })
      .catch(console.error)
 };
  //increment total and answered incorectly client side also make post request server side to make changes
 export const ANSWERED_INCORRECTLY = (userID, flashCardID) => (dispatch) => {
  axios.post('/cards/answeredInCorrectTotal', {userId: userID, flashCardID: flashCardID})
     .then(({status}) =>{
       if(status === 200){
         dispatch({
              type: types.ANSWERED_INCORRECTLY,
               payload: flashCardID
         })
       }
     })
     .catch(console.error)
};
 
// send post request server side to create card use return from post to change state client side 
 export const ADD_CREATED_USER_CARD = (userId, question, answer) => (dispatch) => {
  axios.post('/cards/createCard', {userId: userId, question: question, answer: answer})
     .then((info) =>{
       if(info.status === 200){
         dispatch({
              type: types.ADD_CREATED_USER_CARD,
              payload: info.data.flashCard
         })
       }
     })
     .catch(console.error)
 };
 
 // get request to retrieve flashcards with an array to retrieve categories 
 export const ADD_FLASH_CARD_LIST = event => (dispatch, getState) => {
   event.preventDefault();
   //in the future will also code to include a users ID to get their information as well
   const chosenTopics = getState().flashCodes.chosenTopics;
   //query parameters.... or req.body
   axios.get('/cards/getCards', chosenTopics)
     .then((info) => {
       if (info.status === 200){
        dispatch({ 
          type: types.ADD_FLASH_CARD_LIST,
          payload: info.data
         });
       } 
     })
     .catch(console.error);
 };

 //add a topic to the chosentopics array
 export const ADD_TO_TOPICS_LIST = topic => ({
   type: types.ADD_TO_TOPICS_LIST,
   payload: topic,
 }) 
 //remoove a topic to the chosentopics array
 export const REMOVE_ONE_TOPICS_LIST = topic => ({
   type: types.REMOVE_ID_TOPICS_LIST,
   payload: topic,
 }) 
 

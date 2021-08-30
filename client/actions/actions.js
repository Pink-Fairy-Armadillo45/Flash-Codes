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
//increment total and answered correctly client side also make post request server side to make changes
export const ANSWERED_CORRECTLY = (flashCardID) => (dispatch, getState) => {
  const userID = getState().flashCodes.userID;
  axios.post('/cards/answeredCorrect', {userID: userID, flashCardID: flashCardID})
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
  //increment total and answered incorrectly client side also make post request server side to make changes
export const ANSWERED_INCORRECTLY = (flashCardID) => (dispatch,getState) => {
  const userID = getState().flashCodes.userID;
  axios.post('/cards/answeredIncorrect', {userID: userID, flashCardID: flashCardID})
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
export const ADD_CREATED_USER_CARD = (question, answer, topic) => (dispatch,getState ) => {
  const userID = getState().flashCodes.userID;
  axios.post('/cards/createCard', {userID: userID, question: question, answer: answer, topic: topic})
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
export const ADD_FLASH_CARD_LIST = () => (dispatch, getState) => {
  //in the future will also code to include a users ID to get their information as well
  const chosenTopics = getState().flashCodes.chosenTopics;
  console.log('is something getting sent',chosenTopics)
  //query parameters.... or req.body
  axios.post('/cards/category/', {categories:chosenTopics})
    .then((info) => {
      console.log(info.data)
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
  type: types.REMOVE_ONE_TOPICS_LIST,
  payload: topic,
}) 
 
export const REVEAL_ANSWER = () => ({
  type: types.REVEAL_ANSWER,
}) 
 
// export const Session = () => ({
//   type: types.Session,
// }) 
 

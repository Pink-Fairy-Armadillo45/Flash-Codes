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
export const ANSWERED_CORRECTLY = () => (dispatch, getState) => {
  const userID = getState().flashCodes.userID;
  const flashCardID = getState().flashCodes.flashCardList[0]._id
  console.log('line 18', userID, flashCardID)
  axios.post('/cards/answeredCorrect', {
    userID: userID,
    flashCardID: flashCardID
  })
    .then(({
      status
    }) => {
      if (status === 200) {
        dispatch({
          type: types.ANSWERED_CORRECTLY,
          payload: flashCardID
        })
      }
    })
    .catch(console.error)
};

//increment total and answered incorrectly client side also make post request server side to make changes
export const ANSWERED_INCORRECTLY = () => (dispatch, getState) => {
  const userID = getState().flashCodes.userID;
  const flashCardID = getState().flashCodes.flashCardList[0]._id
  axios.post('/cards/answeredIncorrect', {
    userID: userID,
    flashCardID: flashCardID
  })
    .then(({
      status
    }) => {
      if (status === 200) {
        dispatch({
          type: types.ANSWERED_INCORRECTLY,
          payload: flashCardID
        })
      }
    })
    .catch(console.error)
};

// send post request server side to create card use return from post to change state client side 
export const ADD_CREATED_USER_CARD = (problem, answer, category, is_public) => (dispatch, getState) => {
  const username = getState().flashCodes.username;
  const userID = getState().flashCodes.userID;
  console.log('actions - ADD_CREATED_USER_CARD', is_public);
  axios.post('/cards/create', {
    username: username,
    problem: problem,
    answer: answer,
    category: category,
    userID: userID,
    is_public: is_public
  })
    .then((info) => {
      if (info.status === 200) {
        console.log('the card was added successfully~!')
        dispatch({
          type: types.ADD_CREATED_USER_CARD,
          payload: info.data.create
        })
      }
    })
    .catch(console.error)
};

// get request to retrieve flashcards with an array to retrieve categories 
export const ADD_FLASH_CARD_LIST = () => (dispatch, getState) => {
  function shuffle(array) {
    var currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]
      ];
    }

    return array;
  }
  //in the future will also code to include a users ID to get their information as well
  const chosenTopics = getState().flashCodes.chosenTopics;
  const userID = getState().flashCodes.userID;
  //query parameters.... or req.body
  axios.post('/cards/category/', {
    categories: chosenTopics,
    userID
  })
    .then((info) => {
      console.log(info.data)
      if (info.status === 200) {
        const newArray = shuffle(info.data)
        dispatch({
          type: types.ADD_FLASH_CARD_LIST,
          payload: newArray
        });
      }
    })
    .catch(console.error);
};

export const ADD_PUBLIC_FLASH_CARD_LIST = () => (dispatch, getState) => {
  function shuffle(array) {
    var currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]
      ];
    }

    return array;
  }
  //in the future will also code to include a users ID to get their information as well
  const chosenTopics = getState().flashCodes.chosenTopics;
  const userID = getState().flashCodes.userID;
  //query parameters.... or req.body
  axios.post('/cards/publicCards/', {
    categories: chosenTopics,
    userID
  })
    .then((info) => {
      if (info.status === 200) {
        const newArray = shuffle(info.data)
        dispatch({
          type: types.ADD_PUBLIC_FLASH_CARD_LIST,
          payload: newArray
        });
      }
    })
    .catch(console.error);
};

export const LOGIN = (username, password) => (dispatch, getState) => {
  axios.post('/user/authUser/', {
    username: username,
    password: password
  })
    .then((info) => {
      console.log(info.data)
      if (info.status === 200) {
        dispatch({
          type: types.LOGIN,
          payload: {
            username: username,
            userID: info.data.userID
          }
        });
      }
    })
    .catch((e) => {
      alert("Incorrect Password. Please try again.")
    });
};

export const SIGN_UP = (username, password) => (dispatch, getState) => {
  axios.post('/user/createUser/', {
    username: username,
    password: password
  })
    .then((info) => {
      console.log(info.data)
      if (info.status === 200 && info.data.data === true) {
        dispatch({
          type: types.LOGIN,
          payload: {
            username: username,
            userID: info.data.userID
          }
        });
      }
    })
    .catch(e => {
      alert("This username already exists please pick a different username")
    });
}

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
export const CREATE_CARD = () => ({
  type: types.CREATE_CARD,
})

export const RESET_SESSION = () => ({
  type: types.RESET_SESSION,
})

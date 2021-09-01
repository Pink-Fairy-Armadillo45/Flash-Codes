"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RESET_SESSION = exports.CREATE_CARD = exports.REVEAL_ANSWER = exports.REMOVE_ONE_TOPICS_LIST = exports.ADD_TO_TOPICS_LIST = exports.SIGN_UP = exports.LOGIN = exports.ADD_FLASH_CARD_LIST = exports.ADD_CREATED_USER_CARD = exports.ANSWERED_INCORRECTLY = exports.ANSWERED_CORRECTLY = void 0;

var _axios = _interopRequireDefault(require("axios"));

var types = _interopRequireWildcard(require("../constants/actionTypes"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
//increment total and answered correctly client side also make post request server side to make changes
var ANSWERED_CORRECTLY = function ANSWERED_CORRECTLY() {
  return function (dispatch, getState) {
    var userID = getState().flashCodes.userID;

    var flashCardID = getState().flashCodes.flashCardList[0]._id;

    console.log('line 18', userID, flashCardID);

    _axios["default"].post('/cards/answeredCorrect', {
      userID: userID,
      flashCardID: flashCardID
    }).then(function (_ref) {
      var status = _ref.status;

      if (status === 200) {
        dispatch({
          type: types.ANSWERED_CORRECTLY,
          payload: flashCardID
        });
      }
    })["catch"](console.error);
  };
}; //increment total and answered incorrectly client side also make post request server side to make changes


exports.ANSWERED_CORRECTLY = ANSWERED_CORRECTLY;

var ANSWERED_INCORRECTLY = function ANSWERED_INCORRECTLY() {
  return function (dispatch, getState) {
    var userID = getState().flashCodes.userID;

    var flashCardID = getState().flashCodes.flashCardList[0]._id;

    _axios["default"].post('/cards/answeredIncorrect', {
      userID: userID,
      flashCardID: flashCardID
    }).then(function (_ref2) {
      var status = _ref2.status;

      if (status === 200) {
        dispatch({
          type: types.ANSWERED_INCORRECTLY,
          payload: flashCardID
        });
      }
    })["catch"](console.error);
  };
}; // send post request server side to create card use return from post to change state client side 


exports.ANSWERED_INCORRECTLY = ANSWERED_INCORRECTLY;

var ADD_CREATED_USER_CARD = function ADD_CREATED_USER_CARD(problem, answer, category) {
  return function (dispatch, getState) {
    var username = getState().flashCodes.username;
    var userID = getState().flashCodes.userID;

    _axios["default"].post('/cards/create', {
      username: username,
      problem: problem,
      answer: answer,
      category: category,
      userID: userID
    }).then(function (info) {
      if (info.status === 200) {
        console.log('the card was added successfully~!');
        dispatch({
          type: types.ADD_CREATED_USER_CARD,
          payload: info.data.create
        });
      }
    })["catch"](console.error);
  };
}; // get request to retrieve flashcards with an array to retrieve categories 


exports.ADD_CREATED_USER_CARD = ADD_CREATED_USER_CARD;

var ADD_FLASH_CARD_LIST = function ADD_FLASH_CARD_LIST() {
  return function (dispatch, getState) {
    function shuffle(array) {
      var currentIndex = array.length,
          randomIndex; // While there remain elements to shuffle...

      while (currentIndex != 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--; // And swap it with the current element.

        var _ref3 = [array[randomIndex], array[currentIndex]];
        array[currentIndex] = _ref3[0];
        array[randomIndex] = _ref3[1];
      }

      return array;
    } //in the future will also code to include a users ID to get their information as well


    var chosenTopics = getState().flashCodes.chosenTopics;
    var userID = getState().flashCodes.userID;
    console.log('is something getting sent', chosenTopics); //query parameters.... or req.body

    _axios["default"].post('/cards/category/', {
      categories: chosenTopics,
      userID: userID
    }).then(function (info) {
      console.log(info.data);

      if (info.status === 200) {
        var newArray = shuffle(info.data);
        dispatch({
          type: types.ADD_FLASH_CARD_LIST,
          payload: newArray
        });
      }
    })["catch"](console.error);
  };
};

exports.ADD_FLASH_CARD_LIST = ADD_FLASH_CARD_LIST;

var LOGIN = function LOGIN(username, password) {
  return function (dispatch, getState) {
    _axios["default"].post('/user/authUser/', {
      username: username,
      password: password
    }).then(function (info) {
      console.log(info.data);

      if (info.status === 200) {
        dispatch({
          type: types.LOGIN,
          payload: {
            username: username,
            userID: info.data.userID
          }
        });
      }
    })["catch"](function (e) {
      alert("Incorrect Password. Please try again.");
    });
  };
};

exports.LOGIN = LOGIN;

var SIGN_UP = function SIGN_UP(username, password) {
  return function (dispatch, getState) {
    _axios["default"].post('/user/createUser/', {
      username: username,
      password: password
    }).then(function (info) {
      console.log(info.data);

      if (info.status === 200 && info.data.data === true) {
        dispatch({
          type: types.LOGIN,
          payload: {
            username: username,
            userID: info.data.userID
          }
        });
      }
    })["catch"](function (e) {
      alert("This username already exists please pick a different username");
    });
  };
}; //add a topic to the chosentopics array


exports.SIGN_UP = SIGN_UP;

var ADD_TO_TOPICS_LIST = function ADD_TO_TOPICS_LIST(topic) {
  return {
    type: types.ADD_TO_TOPICS_LIST,
    payload: topic
  };
}; //remoove a topic to the chosentopics array


exports.ADD_TO_TOPICS_LIST = ADD_TO_TOPICS_LIST;

var REMOVE_ONE_TOPICS_LIST = function REMOVE_ONE_TOPICS_LIST(topic) {
  return {
    type: types.REMOVE_ONE_TOPICS_LIST,
    payload: topic
  };
};

exports.REMOVE_ONE_TOPICS_LIST = REMOVE_ONE_TOPICS_LIST;

var REVEAL_ANSWER = function REVEAL_ANSWER() {
  return {
    type: types.REVEAL_ANSWER
  };
};

exports.REVEAL_ANSWER = REVEAL_ANSWER;

var CREATE_CARD = function CREATE_CARD() {
  return {
    type: types.CREATE_CARD
  };
};

exports.CREATE_CARD = CREATE_CARD;

var RESET_SESSION = function RESET_SESSION() {
  return {
    type: types.RESET_SESSION
  };
};

exports.RESET_SESSION = RESET_SESSION;
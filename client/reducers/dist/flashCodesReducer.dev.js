"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var types = _interopRequireWildcard(require("../constants/actionTypes"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  username: null,
  userID: null,
  totalCardsAnswered: 0,
  answeredRight: 0,
  answeredWrong: 0,
  answeredCardList: [],
  flashCardList: [],
  createdUserCards: [],
  chosenTopics: [],
  answerShown: false,
  session: false,
  createCard: false
};

var flashCodesReducer = function flashCodesReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    //increment by 1 to the total and the answered correctly property
    case types.ANSWERED_CORRECTLY:
      {
        var newAnsweredCardList = JSON.parse(JSON.stringify(state.answeredCardList));
        var newflashCardList = JSON.parse(JSON.stringify(state.flashCardList)); // remove first index from flashCardList push it to the answeredCardList to record it  

        newAnsweredCardList.push(newflashCardList.shift());
        var newTotalCardsAnswered = state.totalCardsAnswered;
        var newAnsweredRight = state.answeredRight;
        var newAnswerShown = false;
        return _objectSpread({}, state, {
          totalCardsAnswered: newTotalCardsAnswered + 1,
          answeredRight: newAnsweredRight + 1,
          answeredCardList: newAnsweredCardList,
          flashCardList: newflashCardList,
          answerShown: newAnswerShown
        });
      }
    //increment by 1 to the total and the answered incorrectly property

    case types.ANSWERED_INCORRECTLY:
      {
        var _newAnsweredCardList = JSON.parse(JSON.stringify(state.answeredCardList));

        var _newflashCardList = JSON.parse(JSON.stringify(state.flashCardList)); // remove first index from flashCardList push it to the answeredCardList to record it  


        _newAnsweredCardList.push(_newflashCardList.shift());

        var _newTotalCardsAnswered = state.totalCardsAnswered;
        var newAnsweredWrong = state.answeredWrong;
        var _newAnswerShown = false;
        return _objectSpread({}, state, {
          totalCardsAnswered: _newTotalCardsAnswered + 1,
          answeredWrong: newAnsweredWrong + 1,
          AnsweredCardList: _newAnsweredCardList,
          flashCardList: _newflashCardList,
          answerShown: _newAnswerShown
        });
      }
    //add user created card from the data returned from the post request to the DB

    case types.ADD_CREATED_USER_CARD:
      {
        var newCreatedUserCards = JSON.parse(JSON.stringify(state.createdUserCards));
        newCreatedUserCards.push(action.payload);
        var newCreateCard = false;
        return _objectSpread({}, state, {
          createdUserCards: newCreatedUserCards,
          createCard: newCreateCard
        });
      }
    //add flashcards queried from the data base

    case types.ADD_FLASH_CARD_LIST:
      {
        var newFlashCards = action.payload;
        var newSession = true;
        return _objectSpread({}, state, {
          flashCardList: newFlashCards,
          session: newSession
        });
      }

    case types.ADD_PUBLIC_FLASH_CARD_LIST:
      {
        var _newFlashCards = action.payload;
        var _newSession = true;
        return _objectSpread({}, state, {
          flashCardList: _newFlashCards,
          session: _newSession
        });
      }
    //add a topic to the chosen topics array

    case types.ADD_TO_TOPICS_LIST:
      {
        var newChosenTopics = JSON.parse(JSON.stringify(state.chosenTopics));

        if (action.payload === 'all') {
          newChosenTopics = [];
        } else {
          newChosenTopics.push(action.payload);
        }

        return _objectSpread({}, state, {
          chosenTopics: newChosenTopics
        });
      }

    case types.REMOVE_ONE_TOPICS_LIST:
      {
        var _newChosenTopics = JSON.parse(JSON.stringify(state.chosenTopics));

        _newChosenTopics = _newChosenTopics.filter(function (e) {
          return e !== action.payload;
        });
        return _objectSpread({}, state, {
          chosenTopics: _newChosenTopics
        });
      }

    case types.REVEAL_ANSWER:
      {
        var _newAnswerShown2 = true;
        return _objectSpread({}, state, {
          answerShown: _newAnswerShown2
        });
      }

    case types.CREATE_CARD:
      {
        var _newCreateCard = true;
        return _objectSpread({}, state, {
          createCard: _newCreateCard
        });
      }

    case types.LOGIN:
      {
        var newUserID = action.payload.userID;
        var newUsername = action.payload.username;
        return _objectSpread({}, state, {
          userID: newUserID,
          username: newUsername
        });
      }

    case types.RESET_SESSION:
      {
        var _newSession2 = false;
        return _objectSpread({}, state, {
          session: _newSession2
        });
      }

    default:
      return state;
  }
};

var _default = flashCodesReducer;
exports["default"] = _default;
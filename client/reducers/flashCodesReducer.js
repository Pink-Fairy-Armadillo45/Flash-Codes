/**
 * ************************************
 *
 * @module  flashCodesReducer
 * @author
 * @date
 * @description reducer for flashCodes data
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
   chosenTopics:[],
   answerShown :false,
   session: false
 };
  
 const flashCodesReducer = (state = initialState, action) => {
   switch (action.type) {
   //increment by 1 to the total and the answered correctly property
   case types.ANSWERED_CORRECTLY: {      
     const newAnsweredCardList  = JSON.parse(JSON.stringify(state.answeredCardList))
     const newflashCardList = JSON.parse(JSON.stringify(state.flashCardList)) 
     // remove first index from flashCardList push it to the answeredCardList to record it  
     newAnsweredCardList.push(newflashCardList.shift())
     const newTotalCardsAnswered = state.totalCardsAnswered
     const newAnsweredRight = state.answeredRight
     const newAnswerShown = false
     return {...state,
       totalCardsAnswered: newTotalCardsAnswered + 1,
       answeredRight: newAnsweredRight + 1,
       answeredCardList: newAnsweredCardList,
       flashCardList: newflashCardList,
       answerShown: newAnswerShown
     }
   } 
 
   //increment by 1 to the total and the answered incorrectly property
   case types.ANSWERED_INCORRECTLY: {      
     const newAnsweredCardList  = JSON.parse(JSON.stringify(state.answeredCardList))
     const newflashCardList = JSON.parse(JSON.stringify(state.flashCardList))  
     // remove first index from flashCardList push it to the answeredCardList to record it  
     newAnsweredCardList.push(newflashCardList.shift())
 
     const newTotalCardsAnswered = state.totalCardsAnswered
     const newAnsweredWrong = state.answeredWrong
     const newAnswerShown = false
     return {...state,
       totalCardsAnswered: newTotalCardsAnswered + 1,
       answeredWrong: newAnsweredWrong + 1,
       AnsweredCardList:newAnsweredCardList,
       flashCardList: newflashCardList,
       answerShown: newAnswerShown
     }
   }
 
   //add user created card from the data returned from the post request to the DB
   case types.ADD_CREATED_USER_CARD: {        
     const newCreatedUserCards = JSON.parse(JSON.stringify(state.createdUserCards))
     newCreatedUserCards.push(action.payload)
     return {
       ...state,
       createdUserCards: newCreatedUserCards
     }
   }
 
      
   //add flashcards queried from the data base
   case types.ADD_FLASH_CARD_LIST: {        
     const newFlashCards = action.payload
     const newSession = true
     return {...state,
       flashCardList: newFlashCards,
       session: newSession
     }
   }
 
      
   //add a topic to the chosen topics array
   case types.ADD_TO_TOPICS_LIST: {       
     let newChosenTopics = JSON.parse(JSON.stringify(state.chosenTopics))
     if(action.payload === 'all'){
       newChosenTopics = []
     }else{
       newChosenTopics.push(action.payload)
     }
     return {...state,
       chosenTopics: newChosenTopics
     }
   }
 
 
   case types.REMOVE_ONE_TOPICS_LIST:  {
     let newChosenTopics = JSON.parse(JSON.stringify(state.chosenTopics))
     newChosenTopics = newChosenTopics.filter((e) => e !== action.payload)
     return {...state,
       chosenTopics: newChosenTopics
     }
   }
 
   case types.REVEAL_ANSWER: {
     const newAnswerShown = true
     return {...state,
       answerShown: newAnswerShown
     }
   }
 
  //  case types.Session: {
  //    const newSession = true
  //    return {...state,
  //      session: newSession
  //    }
  //  }
 
  
   default:
     return state; 
       
   }
 };
  
 export default flashCodesReducer;
  
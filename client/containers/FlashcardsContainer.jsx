//  * @module  flashcard
//  * @author  viet
//  * @date    8.28.21
//  * @description Presentation component that renders the card questions/answers and correct/incorrect buttons

import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
// import questions from '
import Topics from '../components/Topics';
import Cards from '../components/Cards';
import CreateCard from '../components/CreateCard';
import Login from '../components/Login';

const mapsStateToProps = (state) => ({
  chosenTopics: state.flashCodes.chosenTopics,
  flashCardList: state.flashCodes.flashCardList,
  session: state.flashCodes.session,
  answerShown : state.flashCodes.answerShown,
  totalCardsAnswered : state.flashCodes.totalCardsAnswered,
  createdUserCards: state.flashCodes.createdUserCards,
  userID : state.flashCodes.userID,
  username : state.flashCodes.username
});


const mapDispatchToProps = (dispatch) => ({
  selectTopic: (topicId) => {
    dispatch(actions.ADD_TO_TOPICS_LIST(topicId));
  },
  deselectTopic: (topicId) => {
    dispatch(actions.REMOVE_ONE_TOPICS_LIST(topicId));
  },
  submit: () => {
    dispatch(actions.ADD_FLASH_CARD_LIST());
  },
  createCard: (question, answer, userID) => {
    dispatch(actions.ADD_CREATED_USER_CARD(question, answer, userID));
  },
  login: (username, password) => {
    dispatch(actions.LOGIN(username, password));
  },
  signUp: (username, password) => {
    dispatch(actions.SIGN_UP(username, password));
  }
});


class FlashcardsContainer extends Component {
  constructor(props) {
    super(props);
  }


  displaySession(){
    if(this.props.session === false){
      return (
          <Topics 
          chosenTopics={this.props.chosenTopics} 
          selectTopic={this.props.selectTopic}
          deselectTopic={this.props.deselectTopic}
          submit={this.props.submit}
          />
      )
    }else{
      return(
              <div>Session in progress.</div>
      )
    }

  }

  UserCreatingCard(){
    if(this.props.session === false){
      return (
          <CreateCard 
          chosenTopics={this.props.chosenTopics} 
          selectTopic={this.props.selectTopic}
          deselectTopic={this.props.deselectTopic}
          submit={this.props.submit}
          />
      )
    }else{
      return(
              <div>New Card Being Created</div>
      )
    }

  }



  render() {
    return(
      <div className="container">
        <div className="outerBox">
          <h1 id="header">Flash Code Cards</h1>
          {this.UserCreatingCard()}
          {this.displaySession()}
          {this.props.userID === null? <Login login = {this.props.login} signUp ={this.props.signUp} /> : 'Welcome ' + this.props.username}
          <Cards 
            flashCardList={this.props.flashCardList}
            session= {this.props.session}
            answerShown = {this.props.answerShown} 
            totalCardsAnswered = {this.props.totalCardsAnswered} 
            chosenTopics = {this.props.chosenTopics}
           />
        </div>
      </div>
    )
  }
}

export default connect(mapsStateToProps, mapDispatchToProps)(FlashcardsContainer);

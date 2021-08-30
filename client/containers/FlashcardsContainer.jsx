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


const mapsStateToProps = (state) => ({
  chosenTopics: state.flashCodes.chosenTopics,
  flashCardList: state.flashCodes.flashCardList,
  session: state.flashCodes.session,
  answerShown : state.flashCodes.answerShown,
  totalCardsAnswered : state.flashCodes.totalCardsAnswered
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

  render() {
    return(
      <div className="container">
        <div className="outerBox">
          <h1 id="header">Flash Code Cards</h1>
          {this.displaySession()}
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

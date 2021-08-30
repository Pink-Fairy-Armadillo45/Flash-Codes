import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';
import ButtonContainer from './../containers/ButtonContainer.jsx'

const mapDispatchToProps = (dispatch) => ({
  revealAns: () => {
    dispatch(actions.REVEAL_ANSWER());
  },
});

const Cards = props => (
    <div className="cardBox">
        <h1>{props.chosenTopics? props.chosenTopics : "chosen topics"}</h1>
        <h1>{props.totalCardsAnswered  ?pros.totalCardsAnswered: "total cards answered"}</h1>
        <h1>{props.flashCardList[0] ? props.flashCardList[0]: "object of the first flashcard"}</h1>
        <button type="button" onClick={() => props.revealAns() } >Reveal Answer</button>
        <ButtonContainer />
  </div>
);


  export default connect(null, mapDispatchToProps)(Cards);
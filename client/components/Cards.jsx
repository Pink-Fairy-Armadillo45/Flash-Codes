import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';


const mapDispatchToProps = (dispatch) => ({
  revealAns: () => {
    dispatch(actions.REVEAL_ANSWER());
  },
});

const Cards = props => (
    <div className="cardBox">
        <h1>{props.chosenTopics}</h1>
        <h1>{props.totalCardsAnswered}</h1>
        <h1>{props.flashCardList[0]}</h1>
        <button type="button" onClick={() => props.revealAns() } >Reveal Answer</button>
        <ButtonContainer />
  </div>
);


  export default connect(null, mapDispatchToProps)(Cards);
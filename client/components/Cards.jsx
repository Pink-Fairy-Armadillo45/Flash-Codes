import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';
import ButtonContainer from './../containers/ButtonContainer.jsx'

const mapDispatchToProps = (dispatch) => ({
  revealAns: () => {
    dispatch(actions.REVEAL_ANSWER());
  },
});



const Cards = props => {
  
  function revealAnswer(){
    if(props.session === true && props.answerShown === false){
     return <button type="button" onClick={() => props.revealAns() } >Reveal Answer</button>
    }else if(props.session === true && props.answerShown === true){
      return <h3>{props.flashCardList[0] ? props.flashCardList[0].answer: "object of the first flashcard"}</h3>
    }
  }
  
  return(
    <div className="cardBox">
        <h1>{props.chosenTopics.length !== 0  ? props.chosenTopics : "chosen topics"}</h1>
        <h1>{props.totalCardsAnswered ? 'total cards answered: '+props.totalCardsAnswered : "total cards answered"}</h1>
        <h1>{props.flashCardList[0] ? props.flashCardList[0].problem: "Title of the first flashcard"}</h1>
        {revealAnswer()}
        {props.session ===true && props.answerShown ==true ? <ButtonContainer /> : console.log('working')}
  </div>
)};


  export default connect(null, mapDispatchToProps)(Cards);
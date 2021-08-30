import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';

const CreateCard = props => {
// 

return(
    <div className="createCard">
        <div>
            <input type='checkbox' id='topic 1' name='topic 1'  onChange={(e) => {
                    if(e.target.checked) return props.selectTopic(e.target.id);
                    else return props.deselectTopic(e.target.id); 
                    }} required/> Topic
                <div>
                    <input type="text" id='Question' name='Question' required />
                    <input type="text" id='Answer' name='Answer' required/>
                </div>
        <div>
        <input type='button' value='Submit' name='Submit UserCard' onClick={() => props.submit() } /> 
    </div>
        {/* <input type ='button' /> */}
        {/* <h1>{props.chosenTopics.length !== 0  ? props.chosenTopics : "chosen topics"}</h1>
        <h1>{props.totalCardsAnswered ? 'total cards answered: '+props.totalCardsAnswered : "total cards answered"}</h1>
        <h1>{props.flashCardList[0] ? props.flashCardList[0].problem: "Title of the first flashcard"}</h1>
        {revealAnswer()}
        {props.session ===true && props.answerShown ==true ? <ButtonContainer /> : console.log('working')} */}
        </div>
  </div>
)
};


export default CreateCard
// connect(mapsStateToProps, mapDispatchToProps)(FlashcardsContainer)


//   function (){
//     if(props.session === true && props.answerShown === false){
//      return <button type="button" onClick={() => props.revealAns() } >Reveal Answer</button>
//     }else if(props.session === true && props.answerShown === true){
//       return <h3>{props.flashCardList[0] ? props.flashCardList[0].answer: "object of the first flashcard"}</h3>
//     }
//   }
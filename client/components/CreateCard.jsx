import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

const useInput = init => {
  const [value, setValue] = useState(init);
  const onChange = e => {

    setValue(e.target.value);
  };
  // return the value with the onChange function instead of setValue function
  return [value, onChange];
};

const CreateCard = props => {
  const [question, setQuestion] = useInput('')
  const [answer, setAnswer] = useInput('')

  const sendNewcard = (userID) => {
    const topic = document.querySelector('#topics').value
    console.log('check topic', topic)
    const is_public = document.querySelector('#is_public').value;
    props.createUserCard(question, answer, topic, is_public, userID)
  }

  return (
    <div className="createCard">
      <div>
        <form>
          <select name="Topics" id="topics" required>
            <option value="Unit 1">Unit 1</option>
            <option value="Unit 2">Unit 2</option>
            <option value="Unit 3">Unit 3</option>
            <option value="Unit 4">Unit 4</option>
            <option value="GOOGLE IT">GOOGLE IT</option>
          </select>
          Make this a public flashcard:
          <select name="public" id="is_public">
            <option value="false" defaultValue>False</option>
            <option value="true">True</option>
          </select>
          <div>
            Question: <input type="text" id='Question' name='Question' value={question} onChange={setQuestion} required />
            Answer: <input type="text" id='Answer' name='Answer' value={answer} onChange={setAnswer} required />
          </div>
          <input type='button' value='Submit a New Card' name='Submit UserCard' onClick={() => { sendNewcard(props.userID) }} />
        </form>
        <div>

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
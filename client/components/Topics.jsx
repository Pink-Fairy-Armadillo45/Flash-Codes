/**
 * ************************************
 *
 * @module  Topics
 * @author
 * @date
 * @description Shows a list of topics for the user to choose from. 
 *
 * ************************************
 */
 import React from 'react';

const Topics = props => (

    //on change i would push that value into my chosentopics array
    //submit button that would send state.chosentopics to the db

    let array = []
    const click = e =>{
        array.push(e.target.value)
    }

    <div className = "Topics">
        <div>
            Topics:
            <div className='button-container'>
                <input type='button' onChange={props.chosenTopics[/*place holder until we decide our action type*/]} value='Topic1'/>
                <input type='button' onClick={props.chosenTopics[/*place holder until we decide our action type*/]} value='Topic2'/>
            </div>
        </div>
    </div>
);

export default Topics;
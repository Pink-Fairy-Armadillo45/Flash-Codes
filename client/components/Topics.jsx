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

    <div className = "Topics">
        <div>
            Select Which Topics You'd Like To Review:
            <div className='button-container'>
            <input type='checkbox' id='Unit 1' name='Unit 1' onChange={(e) => {
                if(e.target.checked) return props.selectTopic(e.target.id);
                else return props.deselectTopic(e.target.id); 
                }}/> Unit 1
            <input type='checkbox' id='Unit 2' name='Unit 2' onChange={(e) => {
                if(e.target.checked) return props.selectTopic(e.target.id);
                else return props.deselectTopic(e.target.id); 
                }}/> Yo Momma
            <input type='checkbox' id='Unit 3' name='Unit 3' onChange={(e) => {
                if(e.target.checked) return props.selectTopic(e.target.id);
                else return props.deselectTopic(e.target.id); 
                }}/> Unit 3
                <div>
                    <input type='button' value='Submit' name='Begin Review' onClick={() => props.submit() } /> 
                </div>
            </div>
        </div>
    </div>
);

export default Topics;
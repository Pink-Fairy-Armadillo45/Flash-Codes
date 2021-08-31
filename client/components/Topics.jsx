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
                }}/> Unit 2
            <input type='checkbox' id='Unit 3' name='Unit 3' onChange={(e) => {
                if(e.target.checked) return props.selectTopic(e.target.id);
                else return props.deselectTopic(e.target.id); 
                }}/> Unit 3
            <input type='checkbox' id='Unit 4' name='Unit 4' onChange={(e) => {
                if(e.target.checked) return props.selectTopic(e.target.id);
                else return props.deselectTopic(e.target.id); 
                }}/> Unit 4
            <input type='checkbox' id='GOOGLE IT' name='GOOGLE IT' onChange={(e) => {
                if(e.target.checked) return props.selectTopic(e.target.id);
                else return props.deselectTopic(e.target.id); 
                }}/> GOOGLE IT
                <div>
                    <input type='button' id='review' value='Begin Review' name='Begin Review' onClick={() => props.submit() } /> 
                </div>
            </div>
        </div>
    </div>
);

export default Topics;
import React, { Component } from 'react';
import Pass from '../components/Pass.jsx';
import Fail from '../components/Fail.jsx';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js'

const mapDispatchToProps = dispatch => ({
    passCard: () => {
        console.log('this is passing')
        dispatch(actions.ANSWERED_CORRECTLY())
    },
    failCard: () => {
        console.log('this is failing')
        dispatch(actions.ANSWERED_INCORRECTLY())
    }
})
class ButtonContainer extends Component {
    constructor(props) {
        super(props)

     }
    render() {
        return (
        <div className="responseButton">
           <Fail handleFailClick={this.props.failCard}/> 
            <Pass handlePassClick={this.props.passCard}/>
        </div>
        );
    };
};


export default connect(null, mapDispatchToProps)(ButtonContainer);
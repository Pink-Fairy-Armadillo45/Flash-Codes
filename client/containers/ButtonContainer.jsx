import React, { Component } from 'react';
import Pass from '../components/Pass.jsx';
import Fail from '../components/Fail.jsx';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js'

const mapDispatchToProps = dispatch => ({
    passCard: (flashCardID) => {
        dispatch(actions.ANSWERED_CORRECTLY(flashCardID))
    },
    failCard: (flashCardID) => {
        dispatch(actions.ANSWERED_INCORRECTLY(flashCardID))
    }
})
class ButtonContainer extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
        <div className="responseButton">
            <Pass handleClick={this.props.passCard}/>
            <Fail handleClick={this.props.failCard}/>
        </div>
        );
    };
};


export default connect(null, mapDispatchToProps)(ButtonContainer);
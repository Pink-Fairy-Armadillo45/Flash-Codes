import React, { Component } from 'react';
import Pass from '../components/Pass.jsx';
import Fail from '../components/Fail.jsx';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js'

const mapDispatchToProps = dispatch => ({
    passCard: (cardId) => {
        dispatch(actions.ANSWERED_CORRECTLY(cardId))
    },
    failCard: (cardId) => {
        dispatch(actions.ANSWERED_INCORRECTLY(cardId))
    }
})
class ButtonContainer extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
        <div className="responseButton">
            <Pass handleclick={this.props.passCard}/>
            <Fail handleclick={this.props.failCard}/>
        </div>
        );
    };
};

export default connect(null, mapDispatchToProps)(ButtonContainer);
//  * @module  flashcard
//  * @author  viet
//  * @date    8.28.21
//  * @description Presentation component that renders the card questions/answers and correct/incorrect buttons

import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
// import questions from '
import Topics from '../components/Topics';
import Cards from '../components/Cards';


const mapsStateToProps = (state) => ({
  chosenTopics: state.chosenTopics,
  flashCardList: state.flashCardList,
});

class FlashcardsContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="container">
        <div className="outerBox">
          <h1 id="header">Flash Code Cards</h1>
          <Topics 
          chosenTopics={this.props.chosenTopics} 
          />
          <Cards 
          flashCardList={this.props.flashCardList}
           />
        </div>
      </div>
    );
  }

}
  const mapDispatchToProps = (dispatch) => ({
    selectTopic: (topicId) => {
      dispatch(actions.ADD_TO_TOPICS_LIST(topicId));
    },
    deselectTopic: (topicId) => {
      dispatch(actions.REMOVE_ONE_TOPICS_LIST(topicId));
    }
  });

export default connect(mapsStateToProps, mapDispatchToProps)(cards);

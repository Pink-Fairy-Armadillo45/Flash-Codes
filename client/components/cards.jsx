// import React from 'react';
// import {connect} from 'react-redux';
// import * as actions from '../actions/actions';

// const cards = props => (
//     <div className="cardBox">
//         <h1>{props.cards}</h1>
//         <h1>{props.cardId}</h1>
//         <h1>{props.userId}</h1>
//         <h1>{props.globalTotal}</h1>
//         <button type="button" onClick={() => props.correctAns(props.cardId) } >Correct</button>
//         <button type="button" onClick={() => props.wrongAns(props.cardId) } >Wrong</button>
//   </div>
//   );

//   const mapDispatchToProps = (dispatch) => ({
//     addCard: (marketId) => {
//       dispatch(actions.addCardActionCreator(marketId));
//     },
//     deleteCard: (marketId) => {
//       dispatch(actions.deleteCardActionCreator(marketId));
//     }
//   });
  
  
//   export default connect(null, mapDispatchToProps)(Market);
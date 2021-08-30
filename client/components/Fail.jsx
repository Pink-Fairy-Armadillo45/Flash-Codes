import React from 'react';

const Fail = props => (
  <div className="fail">
    <button type="button" onClick={() => props.failCard() } >Fail</button>
  </div>
);

export default Fail;
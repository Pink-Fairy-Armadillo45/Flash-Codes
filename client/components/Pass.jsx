import React from 'react';

const Pass = props => (
  <div className="pass">
    <button type="button" onClick={() => props.passCard() } >Pass</button>
  </div>
);

export default Pass;
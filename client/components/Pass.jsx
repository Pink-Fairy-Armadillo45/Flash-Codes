import React from 'react';

const Pass = props => (
  <div className="pass">
    <button type="button" className ='passfail passbutton' onClick={() => props.handlePassClick() } >Pass</button>
  </div>
);

export default Pass;
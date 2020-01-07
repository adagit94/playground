import React from 'react';

import Players from './Players';
import FloatingPoint from './FloatingPoint';

import './Monitor.css';

function Monitor(props) {
  return (
    <div className='controller__monitor'>
      <Players data={props.data.players} />
      <FloatingPoint data={props.data.floatingPoint} />
    </div>
  );
}

function areEqual(prevProps, nextProps) {
  if (nextProps.data.isRunning === false && prevProps.data.isRunning === nextProps.data.isRunning) return true;
}

export default React.memo(Monitor, areEqual);
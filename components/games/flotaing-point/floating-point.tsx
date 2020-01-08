import React from 'react';

function FloatingPoint(props) {
  const data = props.data;
  const point = {
    position: 'absolute',
    top: data.top,
    left: data.left,
    width: '50px',
    height: '50px',
    backgroundColor: '#8b0000',
    borderRadius: '100%',
    visibility: data.visibility
  };

  return (
    <>
      <div style={point} />
    </>
  );
}

function areEqual(prevProps, nextProps) {
  if (prevProps.data.top === nextProps.data.top && prevProps.data.left === nextProps.data.left && prevProps.data.visibility === nextProps.data.visibility) return true;
}


export default React.memo(FloatingPoint, areEqual);
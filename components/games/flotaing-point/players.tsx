import React from 'react';

class Players extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.data.isPaused !== nextProps.data.isPaused && this.props.data.isRunning === nextProps.data.isRunning) return false;
    
    return true;
  }

  componentDidUpdate() {
    const data = this.props.data;
    
    data.matchFloatingPoint();
  }

  render() {
    const data = this.props.data;

    const pointP1 = {
      position: 'absolute',
      top: data.P1.top,
      left: data.P1.left,
      width: data.dimensions + 'px',
      height: data.dimensions + 'px',
      backgroundColor: data.P1.color,
      visibility: data.visibility,
      borderRadius: data.P1.shape === 'circle' || data.P1.shape === 'ellipse' ? '100%' : '',
      transform: data.P1.shape === 'rhombus' ? 'rotate(45deg)' : data.P1.shape === 'ellipse' ? 'rotateX(45deg)' : ''
    };

    const pointP2 = {
      position: 'absolute',
      top: data.P2.top,
      left: data.P2.left,
      width: data.dimensions + 'px',
      height: data.dimensions + 'px',
      backgroundColor: data.P2.color,
      visibility: data.visibility,
      borderRadius: data.P2.shape === 'circle' || data.P2.shape === 'ellipse' ? '100%' : '',
      transform: data.P2.shape === 'rhombus' ? 'rotate(45deg)' : data.P2.shape === 'ellipse' ? 'rotateX(45deg)' : ''
    };

    const pointP3 = {
      position: 'absolute',
      top: data.P3.top,
      left: data.P3.left,
      width: data.dimensions + 'px',
      height: data.dimensions + 'px',
      backgroundColor: data.P3.color,
      visibility: data.visibility,
      borderRadius: data.P3.shape === 'circle' || data.P3.shape === 'ellipse' ? '100%' : '',
      transform: data.P3.shape === 'rhombus' ? 'rotate(45deg)' : data.P3.shape === 'ellipse' ? 'rotateX(45deg)' : ''
    };

    const pointP4 = {
      position: 'absolute',
      top: data.P4.top,
      left: data.P4.left,
      width: data.dimensions + 'px',
      height: data.dimensions + 'px',
      backgroundColor: data.P4.color,
      visibility: data.visibility,
      borderRadius: data.P4.shape === 'circle' || data.P4.shape === 'ellipse' ? '100%' : '',
      transform: data.P4.shape === 'rhombus' ? 'rotate(45deg)' : data.P4.shape === 'ellipse' ? 'rotateX(45deg)' : ''
    };
    
    return (
      <>
        <div style={pointP1} />
        <div style={pointP2} />
        <div style={pointP3} />
        <div style={pointP4} />
      </>
    );
  }
}

export default Players;
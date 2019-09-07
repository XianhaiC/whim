import React from 'react';

class RightImpulseInfo extends React.Component {
  render() {
    return (
      <div className="right-impulse-info">
        <h3>{this.props.impulse.name}</h3>
        <p>xxx Sparks</p>
        <p>{this.props.impulse.description}</p>
      </div>
    );
  }
}

export default RightImpulseInfo;

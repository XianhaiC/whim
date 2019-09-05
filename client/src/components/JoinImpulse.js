import React from 'react';

class JoinImpulse extends React.Component {
  render() {
    return (
      <div className="join_impulse">
        <button onClick={this.props.on_click}>Join Impulse</button>
      </div>
    );
  }
}

export default JoinImpulse;

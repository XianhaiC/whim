import React from 'react';

class CreateImpulse extends React.Component {
  render() {
    return (
      <div className="create_impulse">
        <button onClick={this.props.on_click}>Create Impulse</button>
      </div>
    );
  }
}

export default CreateImpulse;

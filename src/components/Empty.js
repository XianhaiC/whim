import React from 'react';
import { connect } from 'react-redux';

class Empty extends React.Component {
  render() {
    return (
      <div className="empty">
        <h2>Start an impulse!</h2>
        <p>Create or join an impulse on the left.</p>
        <p>Impulses are chat channels that focus on specific topics. Create one to brainstorm project ideas, discuss tech, or leisurely chat!</p>
        <p>Then, invite others to join!</p>
      </div>
    );
  }
}

export default Empty;

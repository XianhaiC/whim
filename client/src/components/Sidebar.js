import React from 'react';
import { connect } from 'react-redux';

import ImpulseList from './ImpulseList';
import { setCenterComponent } from '../actions/index';

class Sidebar extends React.Component {

  handleCreateImpulse() {
    this.props.setCenterComponent(CenterComponent.CREATE);
  }

  handleJoinImpulse() {
    this.props.setCenterComponent(CenterComponent.JOIN);
  }

  render() {
    const {
      linkedImpulses, sessionImpulses,
      linkedSparks, sessionSparks
    } = this.props;

    return (
      <div className="sidebar">
        <ImpulseList listName="Linked Impulses"
          impulses={linkedImpulses} sparks={linkedSparks} />
        <ImpulseList listName="Session Impulses"
          impulses={sessionImpulses} sparks={sessionSparks} />
        <div className="sidebar-buttons">
          <div className="create-impulse">
            <button onClick={this.handleCreateImpulse}>Create Impulse</button>
          </div>
          <div className="join-impulse">
            <button onClick={this.handleJoinImpulse}>Join Impulse</button>
          </div>
        </div>
      </div>
    );
  }
}

export mapStateToProps = state => {
  return {
    linkedImpulses: state.linkedImpulses,
    sessionImpulses: state.sessionImpulses,
    linkedSparks: state.linkedSparks,
    sessionSparks: state.sessionSparks
  }
};

export default connect(mapStateToProps, {
  setCenterComponent
})(Sidebar);

// helpers


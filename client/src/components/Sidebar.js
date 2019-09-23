import React from 'react';
import { connect } from 'react-redux';

import { CenterComponent } from '../helpers';
import { setCenterComponent } from '../actions/index';

import ImpulseList from './ImpulseList';

class Sidebar extends React.Component {
  constructor() {
    super();

    this.handleCreateImpulse = this.handleCreateImpulse.bind(this);
    this.handleJoinImpulse = this.handleJoinImpulse.bind(this);
  }

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

    // call .values() on each dict so we retrieve a list of their values
    // that can be used by ImpulseList
    return (
      <div className="sidebar">
        <ImpulseList listName="Linked Impulses"
          impulses={Object.values(linkedImpulses)}
          sparks={Object.values(linkedSparks)} />
        <ImpulseList listName="Session Impulses"
          impulses={Object.values(sessionImpulses)}
          sparks={Object.values(sessionSparks)} />
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

const mapStateToProps = state => {
  return {
    linkedImpulses: state.data.linkedImpulses,
    sessionImpulses: state.data.sessionImpulses,
    linkedSparks: state.data.linkedSparks,
    sessionSparks: state.data.sessionSparks
  };
};

export default connect(mapStateToProps, {
  setCenterComponent
})(Sidebar);

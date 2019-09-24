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
    const { impulses, sparks, sessionImpulseIds, sessionSparkIds } = this.props;

    let linkedImpulses = [];
    let sessionImpulses = [];

    Object.values(impulses).forEach(impulse => {
      if (sessionImpulseIds[impulse.id] === true)
        sessionImpulses.push(impulse);
      else
        linkedImpulses.push(impulse);
    });

    // call .values() on each dict so we retrieve a list of their values
    // that can be used by ImpulseList
    return (
      <div className="sidebar">
        <div className="sidebar-lists">
          <ImpulseList listName="Linked Impulses"
            impulses={linkedImpulses} />
          <ImpulseList listName="Session Impulses"
            impulses={sessionImpulses} />
        </div>
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
    impulses: state.data.impulses,
    sparks: state.data.sparks,
    sessionImpulseIds: state.session.sessionImpulseIds,
    sessionSparkIds: state.session.sessionSparkIds,
  };
};

export default connect(mapStateToProps, {
  setCenterComponent
})(Sidebar);

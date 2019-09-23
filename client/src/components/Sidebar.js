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
    let linkedSparks = [];
    let sessionSparks = [];

    Object.values(impulses).forEach(impulse => {
      if (sessionImpulseIds[impulse.id] === true)
        sessionImpulses.push(impulse);
      else
        linkedImpulses.push(impulse);
    });

    Object.values(sparks).forEach(spark => {
      if (sessionImpulseIds[spark.id] === true)
        sessionSparks.push(spark);
      else
        linkedSparks.push(spark);
    });

    // call .values() on each dict so we retrieve a list of their values
    // that can be used by ImpulseList
    return (
      <div className="sidebar">
        <ImpulseList listName="Linked Impulses"
          impulses={linkedImpulses}
          sparks={linkedSparks} />
        <ImpulseList listName="Session Impulses"
          impulses={sessionImpulses}
          sparks={sessionSparks} />
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

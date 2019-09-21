import React from 'react';
import { connect } from 'react-redux';

class ImpulseHeader extends React.Component {
  render() {
    const { activeImpulseId, linkedImpulses, sessionImpulses } = this.props;
    const activeImpulse =
      {...linkedImpulses, ...sessionImpulses}[activeImpulseId];

    return (
      <div className="impulse-header">
        <div className="impulse-info-flex">
          <h3>{activeImpulse.name}</h3>
          <p>xxx Sparks</p>
        </div>
        <button className="right-sidebar-toggle">Right Sidebar</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeImpulseId: state.control.activeImpulseId,
    linkedImpulses: state.data.linkedImpulses,
    sessionImpulses: state.data.sessionImpulses
  };
};

export default connect(mapStateToProps)(ImpulseHeader);

import React from 'react';
import { connect } from 'react-redux';

class ImpulseHeader extends React.Component {
  render() {
    let activeImpulse = this.props.impulses.find(
      impulse => impulse.id == this.props.activeImpulseId);

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

export mapStateToProps = state => {
  return {
    impulses: state.impulses,
    activeImpulseId: state.activeImpulseId,
  }
}

export default connect(mapStateToProps)(ImpulseHeader);

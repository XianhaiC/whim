import React from 'react';
import { connect } from 'react-redux';

class ImpulseHeader extends React.Component {
  render() {
    return (
      <div className="impulse-header">
        <div className="impulse-info-flex">
          <h3>{this.props.activeImpulse.name}</h3>
          <p>xxx Sparks</p>
        </div>
        <button className="right-sidebar-toggle">Right Sidebar</button>
      </div>
    );
  }
}

export mapStateToProps = state => {
  return {
    activeImpulse: state.activeImpulse,
  };
};

export default connect(mapStateToProps)(ImpulseHeader);

import React from 'react';
import { connect } from 'react-redux';

class ImpulseDetails extends React.Component {
  render() {
    const {activeImpulseId, impulses } = this.props;
    const activeImpulse = impulses[activeImpulseId];

    return (
      <div className="inspiration-details">
        <div className="inspiration-list-header">
          <div className="inspiration-list-info top-info">
            <h3 className="inspiration-list-title">Impulse description</h3>
          </div>
        </div>
        <div className="inspiration-card inspiration-card-details">
          <p className="inspiration-card-text">{activeImpulse.description}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeImpulseId: state.control.activeImpulseId,
    impulses: state.data.impulses
  };
};

export default connect(mapStateToProps)(ImpulseDetails);

import React from 'react';
import { connect } from 'react-redux';

class ImpulseHeader extends React.Component {
  render() {
    const { activeImpulseId, linkedImpulses, sessionImpulses } = this.props;
    const activeImpulse =
      {...linkedImpulses, ...sessionImpulses}[activeImpulseId];

    console.log("HASH");
    console.log(activeImpulse.invite_hash);

    return (
      <div className="impulse-header">
        {activeImpulse.invite_hash &&
            <p>Invite hash: {activeImpulse.invite_hash}</p>}
        <div className="impulse-info-flex">
          <h3>{activeImpulse.name}</h3>
          <p>xxx Sparks</p>
        </div>
        <button className="link-btn">Link</button>
        <button className="invite-btn">Invite</button>
        <button className="info-btn">Info</button>
        <button className="settings-btn">Settings</button>
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

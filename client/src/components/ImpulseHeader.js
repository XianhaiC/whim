import React from 'react';
import { connect } from 'react-redux';

import { createInvite, linkAccount } from '../actions/index';

class ImpulseHeader extends React.Component {
  constructor() {
    super();

    this.handleLinkAccount = this.handleLinkAccount.bind(this);
    this.handleCreateInvite = this.handleCreateInvite.bind(this);
  }

  handleLinkAccount() {
    this.props.linkAccount(this.props.activeSparkId, this.props.accountId);
  }

  handleCreateInvite() {
    this.props.createInvite(this.props.activeImpulseId);
  }

  render() {
    const { activeImpulseId, impulses } = this.props;
    const activeImpulse = impulses[activeImpulseId];

    return (
      <div className="impulse-header">
        <div className="impulse-header-info">
          <h3>{activeImpulse.name}</h3>
          <p>xxx Sparks</p>
          {activeImpulse.invite_hash 
              && <p>Invite hash: {activeImpulse.invite_hash}</p>}
        </div>
        <div className="impulse-header-buttons">
          <button className="link-btn" onClick={this.handleLinkAccount}>Link</button>
          <button className="invite-btn" onClick={this.handleCreateInvite}>Invite</button>
          <button className="info-btn">Info</button>
          <button className="settings-btn">Settings</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    accountId: state.session.accountId,
    activeImpulseId: state.control.activeImpulseId,
    activeSparkId: state.control.activeSparkId,
    impulses: state.data.impulses
  };
};

export default connect(mapStateToProps, {
  createInvite,
  linkAccount
})(ImpulseHeader);

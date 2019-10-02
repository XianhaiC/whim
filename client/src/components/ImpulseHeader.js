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
      <div className="impulse-header top-header">
        <div className="impulse-header-info top-info">
          <h3>{activeImpulse.name}</h3>
          <div className="impulse-header-sub top-info-sub">
            <p>{activeImpulse.sparks_joined} Spark{activeImpulse.sparks_joined != 1 ? "s" : ""} joined</p>
            {activeImpulse.invite_hash 
                && <p>Invite hash: {activeImpulse.invite_hash}</p>}
          </div>
        </div>
        <div className="impulse-header-buttons">
          <div className="impulse-header-button" onClick={this.handleLinkAccount}>
            <i className="fas fa-link"></i>  Link
          </div>
          <div className="impulse-header-button" onClick={this.handleCreateInvite}>
            <i className="fas fa-share-alt"></i>  Invite
          </div>
          <div className="impulse-header-button">
            <i className="fas fa-info"></i>
          </div>
          <div className="impulse-header-button">
            <i className="fas fa-cog"></i>
          </div>
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

import React from 'react';
import { connect } from 'react-redux';

import { RightbarComponent } from '../helpers';
import { createInvite, linkAccount, setRightbarComponent,
  setInvitePopupOpen } from '../actions/index';

class ImpulseHeader extends React.Component {
  constructor() {
    super();

    this.handleLinkAccount = this.handleLinkAccount.bind(this);
    this.handleInvite = this.handleInvite.bind(this);
    this.handleInfo = this.handleInfo.bind(this);
    this.handleList = this.handleList.bind(this);
  }

  handleLinkAccount() {
    this.props.linkAccount(this.props.activeSparkId, this.props.accountId);
  }

  handleInvite() {
    //this.props.createInvite(this.props.activeImpulseId);
    this.props.setInvitePopupOpen(true);
  }

  handleInfo() {
    this.props.setRightbarComponent(RightbarComponent.INFO);
  }

  handleList() {
    this.props.setRightbarComponent(RightbarComponent.LIST);
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
          <div className="impulse-header-button" onClick={this.handleInvite}>
            <i className="fas fa-share-alt"></i>  Invite
          </div>
          <div className="impulse-header-button" onClick={this.handleInfo}>
            <i className="fas fa-info"></i>
          </div>
          <div className="impulse-header-button" onClick={this.handleList}>
            <i className="fas fa-lightbulb"></i>
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
  linkAccount,
  setRightbarComponent,
  setInvitePopupOpen
})(ImpulseHeader);

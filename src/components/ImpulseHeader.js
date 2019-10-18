import React from 'react';
import { connect } from 'react-redux';

import { RightbarComponent } from '../helpers';
import { linkAccount, setRightbarComponent,
  setInvitePopupOpen, setLinkPopupOpen } from '../actions/index';

class ImpulseHeader extends React.Component {
  constructor() {
    super();

    this.handleLinkAccount = this.handleLinkAccount.bind(this);
    this.handleInvite = this.handleInvite.bind(this);
    this.handleInfo = this.handleInfo.bind(this);
    this.handleList = this.handleList.bind(this);
  }

  handleLinkAccount() {
    this.props.setLinkPopupOpen(true);
    if (!this.props.accountActivated) return;
    this.props.linkAccount(this.props.activeSparkId, this.props.accountId);
  }

  handleInvite() {
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
            <p>{activeImpulse.sparks_joined} Spark{activeImpulse.sparks_joined !== 1 ? "s" : ""} joined</p>
            {activeImpulse.invite_hash
                && <p>Invite hash: {activeImpulse.invite_hash}</p>}
          </div>
        </div>
        <div className="impulse-header-buttons header-buttons">
          <div className="header-button tooltip-south" onClick={this.handleLinkAccount}>
            <i className="fas fa-link"></i>  Link
            <span className="tooltiptext-south">Link spark to account</span>
          </div>
          <div className="header-button tooltip-south" onClick={this.handleInvite}>
            <i className="fas fa-share-alt"></i>  Invite
            <span className="tooltiptext-south">Invite to this Impulse</span>
          </div>
          <div className="header-button tooltip-south" onClick={this.handleInfo}>
            <i className="fas fa-info"></i>
            <span className="tooltiptext-south">Impulse info</span>
          </div>
          <div className="header-button tooltip-south" onClick={this.handleList}>
            <i className="fas fa-lightbulb"></i>
            <span className="tooltiptext-south">Inspirations tab</span>
          </div>
          <div className="header-button tooltip-south">
            <i className="fas fa-cog"></i>
            <span className="tooltiptext-south">Options (not implemented)</span>
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
    impulses: state.data.impulses,
    accountActivated: state.session.accountActivated
  };
};

export default connect(mapStateToProps, {
  linkAccount,
  setRightbarComponent,
  setInvitePopupOpen,
  setLinkPopupOpen
})(ImpulseHeader);

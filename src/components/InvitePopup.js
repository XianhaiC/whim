import React from 'react';
import { connect } from 'react-redux';
import onClickOutside from "react-onclickoutside";

import { exists } from '../helpers';
import { createInvite, setInvitePopupOpen } from '../actions/index';
import { URL_ROOT } from '../constants';

class InvitePopup extends React.Component {
  constructor() {
    super();

    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleGenerate = this.handleGenerate.bind(this);
  }

  handleClickOutside(e) {
    this.props.setInvitePopupOpen(false);
  }

  handleGenerate() {
    this.props.createInvite(this.props.activeImpulseId);
  }

  render() {
    const { activeImpulseId, impulses } = this.props;
    const activeImpulse = impulses[activeImpulseId];

    if (!this.props.invitePopupOpen) return null;

    const content = exists(activeImpulse.invite_hash) ? (
      <div className="popup-wrapper">
        <div className="popup-container">
          <p>Link:</p>
          <p className="popup-link">{URL_ROOT}/invite/{activeImpulse.invite_hash}</p>
        </div>
        <div className="popup-container">
          <p>Code:</p>
          <p className="popup-code">{activeImpulse.invite_hash}</p>
        </div>
      </div>
    ) : null;

    return (
      <div className="popup" ref={el => this.popup = el}>
        <h2>Share the impulse</h2>
        {content}
        <button onClick={this.handleGenerate}>Generate invite</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    invitePopupOpen: state.control.invitePopupOpen,
    activeImpulseId: state.control.activeImpulseId,
    impulses: state.data.impulses
  };
}

export default connect(mapStateToProps, {
  createInvite,
  setInvitePopupOpen
})(onClickOutside(InvitePopup));

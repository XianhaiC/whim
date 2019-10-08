import React from 'react';
import { connect } from 'react-redux';
import onClickOutside from "react-onclickoutside";

import { setInvitePopupOpen } from '../actions/index';
import { URL_ROOT } from '../constants';

class InvitePopup extends React.Component {
  constructor() {
    super();

  }

  handleClickOutside(e) {
    console.log("CLICKED");
    this.props.setInvitePopupOpen(false);
  }

  render() {
    const { activeImpulseId, impulses } = this.props;
    const activeImpulse = impulses[activeImpulseId];

    const popup = this.props.invitePopupOpen ? (
      <div className="invite-popup" ref={el => this.popup = el}>
        <h2>Share the impulse</h2>
        <div className="invite-popup-wrapper">
          <div className="invite-popup-container">
            <p>Invite link</p>
            <p className="invite-popup-link">{URL_ROOT}/invite/{activeImpulse.invite_hash}</p>
          </div>
          <div className="invite-popup-container">
            <p>Impulse hash</p>
            <p className="invite-popup-code">{activeImpulse.invite_hash}</p>
          </div>
        </div>
      </div>
    ) : null;

    return popup;
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
  setInvitePopupOpen
})(onClickOutside(InvitePopup));

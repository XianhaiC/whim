import React from 'react';
import { connect } from 'react-redux';
import onClickOutside from "react-onclickoutside";

import { setInvitePopupOpen } from '../actions/index';

class InvitePopup extends React.Component {
  constructor() {
    super();

  }

  handleClickOutside(e) {
    console.log("CLICKED");
    this.props.setInvitePopupOpen(false);
  }

  render() {
    const popup = this.props.invitePopupOpen ? (
      <div className="invite-popup" ref={el => this.popup = el}>
          INVITE POPUP
      </div>
    ) : null;

    return popup;
  }
}

const mapStateToProps = state => {
  return {
    invitePopupOpen: state.control.invitePopupOpen
  };
}

export default connect(mapStateToProps, {
  setInvitePopupOpen
})(onClickOutside(InvitePopup));

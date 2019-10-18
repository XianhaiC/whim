import React from 'react';
import { connect } from 'react-redux';
import onClickOutside from "react-onclickoutside";

import { setLinkPopupOpen } from '../actions/index';

class LinkPopup extends React.Component {
  constructor() {
    super();

    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  handleClickOutside(e) {
    this.props.setLinkPopupOpen(false);
  }

  render() {
    const { accountActivated, accountHandle } = this.props;

    if (!this.props.linkPopupOpen) return null;

    const content = accountActivated ? (
      <div className="popup" ref={el => this.popup = el}>
        <h2>Linked spark to @{accountHandle}!</h2>
      </div>
    ) : (
      <div className="popup" ref={el => this.popup = el}>
        <h2>Can't link to account!</h2>
        <p>Make sure you are logged in and have activated your account.</p>
      </div>
    );

    return content;
  }
}

const mapStateToProps = state => {
  return {
    linkPopupOpen: state.control.linkPopupOpen,
    accountActivated: state.session.accountActivated,
    accountHandle: state.session.accountHandle
  };
}

export default connect(mapStateToProps, {
  setLinkPopupOpen
})(onClickOutside(LinkPopup));

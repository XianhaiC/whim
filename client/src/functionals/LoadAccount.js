import React from 'react';
import { connect } from 'react-redux';

import { exists } from '../helpers';
import { login, getLinkedImpulses, getLinkedSparks } from '../actions/index';

class LoadAccount extends React.Component {
  componentDidMount() {
    const accountToken = sessionStorage.getItem('accountToken');
    const accountId = sessionStorage.getItem('accountId');

    console.log("ACCOUNT ID");
    console.log(accountId);
    console.log(accountToken);

    if (exists(accountId) && exists(accountToken))
      this.props.login(accountId, accountToken);
  }

  componentDidUpdate() {
    if (this.props.loggedIn && exists(this.props.accountId))
      this.loadAccount();
  }

  loadAccount() {
    this.props.getLinkedImpulses(this.props.accountId);
    this.props.getLinkedSparks(this.props.accountId);
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.session.loggedIn,
    accountId: state.session.accountId
  }
};

export default connect(mapStateToProps, {
  login,
  getLinkedImpulses,
  getLinkedSparks
})(LoadAccount);

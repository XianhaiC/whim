import React from 'react';
import { connect } from 'react-redux';

import { exists } from '../helpers';
import { getAccount, getAccountData } from '../actions/index';

class LoadAccount extends React.Component {
  componentDidMount() {
    const accountToken = localStorage.getItem('accountToken');
    const accountId = localStorage.getItem('accountId');

    if (exists(accountId) && exists(accountToken))
      this.props.getAccount(accountId, accountToken);

    if (this.props.loggedIn)
      this.loadAccount();
  }

  componentDidUpdate() {
    if (this.props.loggedIn && exists(this.props.accountId))
      this.loadAccount();
  }

  loadAccount() {
    this.props.getAccountData(this.props.accountId);
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
  getAccount,
  getAccountData
})(LoadAccount);

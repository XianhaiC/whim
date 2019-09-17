import React from 'react';
import { connect } from 'react-redux';

import { exists } from './helpers';

class LoadAccount extends React.Component {
  componentDidMount() {
    const accountToken = sessionStorage.getItem('accountToken');
    const accountId = sessionStorage.getItem('accountId');

    if (exsists(accountId) && exists(accountToken))
      this.props.login(accountId, accountToken);
  }

  componentDidUpdate() {
    if (this.props.loggedIn && exists(this.props.accountId))
      this.loadAccount();
  }

  loadAccount() {
    getLinkedImpulses(this.props.accountId);
    getLinkedSparks(this.props.accountId);
  }

  render() {
    return null;
  }
}

export mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    accountId: state.accountId
  }
};

export default connect(mapStateToProps, {
  login
})(LoadAccount);

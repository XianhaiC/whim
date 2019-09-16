import React from 'react';
import { connect } from 'react-redux';

import { API_ROOT, HEADERS, PATH_QUERY_MESSAGES } from '../constants';

class LoadAccount extends React.Component {
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

export default connect(mapStateToProps)(ActiveImpulse);

import React from 'react';
import { connect } from 'react-redux';

import { exists } from './helpers';

class LoadSession extends React.Component {
  componentDidMount() {
    this.loadSession();
  }

  loadSession() {
    const sessionToken = sessionStorage.getItem('sessionToken');
    if (!exists(sessionToken))
      this.props.registerSession();
    else {
      if (!exists(this.props.sessionToken))
        this.props.setSession(sessionToken);
      this.props.getSession();
    }
  }

  render() {
    return null;
  }
}

export mapStateToProps = state => {
  return {
    sessionToken: state.sessionToken
  }
};

export default connect(mapStateToProps, {
  setSession
})(LoadSession);

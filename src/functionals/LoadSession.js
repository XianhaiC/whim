import React from 'react';
import { connect } from 'react-redux';

import { exists } from '../helpers';
import {
  setSession,
  getSession,
  registerSession
} from '../actions/index';

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

const mapStateToProps = state => {
  return {
    sessionToken: state.session.sessionToken
  }
};

export default connect(mapStateToProps, {
  setSession,
  getSession,
  registerSession
})(LoadSession);

import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

import { PATH_BOARD, PATH_LOGIN, PATH_SIGNUP } from '../constants';
import { CenterComponent } from '../helpers';
import { setCenterComponent } from '../actions/index';

import ImpulseList from './ImpulseList';
import Login from './Login';

class Sidebar extends React.Component {
  constructor() {
    super();

    this.state = {
      shouldRedirectLogin: false,
      shouldRedirectSignup: false,
      shouldRedirectLogout: false
    }

    this.handleCreateImpulse = this.handleCreateImpulse.bind(this);
    this.handleJoinImpulse = this.handleJoinImpulse.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);

    this.Header = this.Header.bind(this);
  }

  handleCreateImpulse() {
    this.props.setCenterComponent(CenterComponent.CREATE);
  }

  handleJoinImpulse() {
    this.props.setCenterComponent(CenterComponent.JOIN);
  }

  handleLogin = () => {
    this.setState( {shouldRedirectLogin: true });
  }

  handleLogout() {
    localStorage.removeItem('accountId');
    localStorage.removeItem('accountToken');
    window.location.reload();
  }

  handleSignup = () => {
    this.setState( {shouldRedirectSignup: true });
  }

  renderRedirect() {
    if (this.state.shouldRedirectLogin) {
      return <Redirect to={PATH_LOGIN} />
    }
    else if (this.state.shouldRedirectSignup) {
      return <Redirect to={PATH_SIGNUP} />
    }
    else if (this.state.shouldRedirectLogout) {
      return <Redirect to={PATH_BOARD} />
    }
  }

  Header() {
    const { loggedIn, accountHandle } = this.props;
    if (loggedIn) {
      return (
        <div className="sidebar-header top-header">
          <h3>@{accountHandle}</h3>
          <button className="logout" onClick={this.handleLogout}>Logout</button>
        </div>
      );

    }
    else {
      return (
        <div className="top-buttons sidebar-buttons">
          <button className="sidebar-button" onClick={this.handleLogin}>Login</button>
          <button className="sidebar-button" onClick={this.handleSignup}>Signup</button>
        </div>
      );
    }
  }

  render() {
    const { impulses, sparks, sessionImpulseIds, sessionSparkIds, loggedIn } = this.props;

    let linkedImpulses = [];
    let sessionImpulses = [];

    Object.values(impulses).forEach(impulse => {
      if (sessionImpulseIds[impulse.id] === true)
        sessionImpulses.push(impulse);
      else
        linkedImpulses.push(impulse);
    });

    // call .values() on each dict so we retrieve a list of their values
    // that can be used by ImpulseList
    return (

      <div className="sidebar">
        {this.renderRedirect()}
        <div className="sidebar-lists">
          <this.Header />
          <ImpulseList listName="Impulses"
            impulses={linkedImpulses} />
          <ImpulseList listName="Un-linked"
            impulses={sessionImpulses} />
        </div>
        <div className="sidebar-buttons">
          <button className="sidebar-button" onClick={this.handleCreateImpulse}>
            <i className="fas fa-plus"></i>  Create
          </button>
          <button className="sidebar-button" onClick={this.handleJoinImpulse}>
            <i className="fas fa-users"></i>  Join
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    impulses: state.data.impulses,
    sparks: state.data.sparks,
    sessionImpulseIds: state.session.sessionImpulseIds,
    sessionSparkIds: state.session.sessionSparkIds,
    loggedIn: state.session.loggedIn,
    accountHandle: state.session.accountHandle
  };
};

export default withRouter(connect(mapStateToProps, {
  setCenterComponent
})(Sidebar));

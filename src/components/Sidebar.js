import React from 'react';
import { connect } from 'react-redux';

import { PATH_LOGIN, PATH_SIGNUP } from '../constants';
import history from '../history';
import { exists, CenterComponent } from '../helpers';
import { setCenterComponent } from '../actions/index';

import ImpulseList from './ImpulseList';

class Sidebar extends React.Component {
  constructor() {
    super();

    this.handleCreateImpulse = this.handleCreateImpulse.bind(this);
    this.handleJoinImpulse = this.handleJoinImpulse.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSignup = this.handleSignup.bind(this);

    this.Header = this.Header.bind(this);
  }

  handleCreateImpulse() {
    this.props.setCenterComponent(CenterComponent.CREATE);
  }

  handleJoinImpulse() {
    this.props.setCenterComponent(CenterComponent.JOIN);
  }

  handleLogin = () => {
    history.push(PATH_LOGIN);
  }

  handleLogout() {
    localStorage.removeItem('accountId');
    localStorage.removeItem('accountToken');
    window.location.reload();
  }

  handleSignup = () => {
    history.push(PATH_SIGNUP);
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
    const { impulses, sparks, loggedIn, accountId } = this.props;

    let linkedImpulses = [];
    let sessionImpulses = [];

    let linkedImpulseIds = [];
    if (loggedIn && exists(accountId)) {
      linkedImpulseIds = Object.values(sparks).reduce((filtered, spark) => {
        if (spark.account_id === accountId) filtered.push(spark.impulse_id);
        return filtered;
      }, []);
    }

    Object.values(impulses).forEach(impulse => {
      if (linkedImpulseIds.includes(impulse.id))
        linkedImpulses.push(impulse);
      else
        sessionImpulses.push(impulse);
    });

    // call .values() on each dict so we retrieve a list of their values
    // that can be used by ImpulseList
    return (

      <div className="sidebar">
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
    loggedIn: state.session.loggedIn,
    accountId: state.session.accountId,
    accountHandle: state.session.accountHandle
  };
};

export default connect(mapStateToProps, {
  setCenterComponent
})(Sidebar);

import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

import { PATH_LOGIN } from '../constants';
import { CenterComponent } from '../helpers';
import { setCenterComponent } from '../actions/index';

import ImpulseList from './ImpulseList';
import Login from './Login';

class Sidebar extends React.Component {
  constructor() {
    super();

    this.state = {
      shouldRedirect: false
    }

    this.handleCreateImpulse = this.handleCreateImpulse.bind(this);
    this.handleJoinImpulse = this.handleJoinImpulse.bind(this);
    this.setRedirect = this.setRedirect.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
  }

  handleCreateImpulse() {
    this.props.setCenterComponent(CenterComponent.CREATE);
  }

  handleJoinImpulse() {
    this.props.setCenterComponent(CenterComponent.JOIN);
  }

  setRedirect = () => {
    this.setState( {shouldRedirect: true });
  }

  renderRedirect = () => {
    if (this.state.shouldRedirect) {
      return <Redirect to ={PATH_LOGIN} />
    }
  }

  render() {
    const { impulses, sparks, sessionImpulseIds, sessionSparkIds } = this.props;

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
        <div className="sidebar-lists">
          <div className="login-button">
            {this.renderRedirect()}
            { this.props.loggedIn ? null : <button onClick={this.setRedirect} type="button">Login</button>}
          </div>
          <ImpulseList listName="Impulses"
            impulses={linkedImpulses} />
          <ImpulseList listName="Un-linked"
            impulses={sessionImpulses} />
        </div>
        <div className="sidebar-buttons">
          <div className="sidebar-button" onClick={this.handleCreateImpulse}>
            <i className="fas fa-plus"></i>  Create
          </div>
          <div className="sidebar-button" onClick={this.handleJoinImpulse}>
            <i className="fas fa-users"></i>  Join
          </div>
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
    loggedIn: state.session.loggedIn
  };
};

export default withRouter(connect(mapStateToProps, {
  setCenterComponent
})(Sidebar));

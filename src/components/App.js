import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import { API_ROOT, HEADERS, PATH_ROOT, PATH_INVITE,
         PATH_INVALID_INVITE, PATH_BOARD, PATH_LOGIN, PATH_SIGNUP, PATH_CONFIRMATION } from '../constants';
import { exists } from '../helpers';
import history from '../history';
import Board from './Board';
import Login from './Login';
import Signup from './Signup';
import Confirmation from './Confirmation';
import InvalidInvite from './InvalidInvite';
import Functionals from '../functionals/Functionals';
import {
  updateThreads,
  appendThreadMessages,
  updateImpulses,
  updateSparks
} from '../actions/index';

class App extends React.Component {
  constructor() {
    super();

    this.parseInvite = this.parseInvite.bind(this);
    this.handleImpulseJoined = this.handleImpulseJoined.bind(this);
    this.renderBoard = this.renderBoard.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.renderSignup = this.renderSignup.bind(this);
  }

  parseInvite(props) {
    fetch(`${API_ROOT}/impulses/invite/${props.match.params.hash}`, {
      method: 'GET',
      headers: HEADERS
    })
    .then(res => res.json())
    .then(data => {
      console.log("INVITE");
      console.log(data);
      if (!exists(data.impulse)) {
        // redirect to error page
        history.push(PATH_INVALID_INVITE);
      }
      else {
        const { impulse, sparks } = data;

        this.props.updateThreads(impulse.message_threads);
        const inspirations = impulse.message_threads.reduce((filtered, thread) => {
          if (thread.parent_type === "Message") filtered.push(thread.parent);
          return filtered;
        }, []);
        this.props.appendThreadMessages(impulse.message_thread.id, inspirations);

        // we don't store thread data in the impulse list
        delete impulse.message_threads;
        this.props.updateImpulses([impulse]);
        this.props.updateSparks(sparks);

        history.push(PATH_BOARD);
      }
    });
  }

  handleImpulseJoined(impulse) {
    console.log(impulse);
    this.setState({ invited_impulse: impulse });
  }

  renderLogin() {
    console.log("LOGIN RENDERING");
    return (
      <Login />
    );
  }

  renderSignup() {
    return <Signup />
  }

  renderBoard(props) {
    return <Board />
  }

  renderConfirmation(props) {
    return <Confirmation uuid={props.match.params.uuid} />;
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path={PATH_ROOT} render={this.renderBoard} />
          <Route exact path={PATH_BOARD} render={this.renderBoard} />
          <Route exact path={PATH_INVALID_INVITE} component={InvalidInvite} />
          <Route exact path={PATH_LOGIN} render={this.renderLogin} />
          <Route path={PATH_INVITE} render={this.parseInvite} />
          <Route path={PATH_CONFIRMATION} render={this.renderConfirmation} />
          <Route exact path={PATH_SIGNUP} render={this.renderSignup} />
        </Switch>
        <Functionals />
      </div>
    );
  }
}

export default connect(null, {
  updateThreads,
  appendThreadMessages,
  updateImpulses,
  updateSparks,
})(App);

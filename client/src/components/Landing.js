import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { API_ROOT, HEADERS, UNDEFINED, PATH_BOARD } from '../constants';
import { exists } from './helpers';

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      impulse_hash: '',
      invalid_hash: false,
      redirect_login: false
    }

    this.handleJoinImpulse = this.handleJoinImpulse.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.redirectLogin = this.redirectLogin.bind(this);
  }

  handleJoinImpulse(e) {
    e.preventDefault();

    fetch(`${API_ROOT}/impulses/invite/${this.state.impulse_hash}`, {
      method: 'GET',
      headers: HEADERS
    })
    .then(res => res.json())
    .then(impulse => {
      if (exists(impulse.status) && impulse.status === "400") {
        this.setState({ invalid_hash: true });
      }
      else this.props.onImpulseJoined(impulse);
      return;
    });
  }

  handleChange(e) {
    this.setState({ impulse_hash: e.target.value });
  }

  redirectLogin() {
    this.setState({ redirect_login: true });
  }

  renderRedirect() {
    if (this.state.redirect_login) return <Redirect to={PATH_BOARD} />
  }

  render() {
    return (
      <div className="Landing">
        {this.renderRedirect()}
        <form onSubmit={this.handleJoinImpulse}>
          { this.state.invalid_hash && <p>Invalid hash!</p> }
          <label>Join Impulse:</label>
          <input type="text" 
            value={this.state.impulse_hash}
            onChange={this.handleChange} />
          <input type="submit" />
        </form>
        <button onClick={this.redirectLogin}>Login</button>
      </div>
    );
  }
}

export default Landing;

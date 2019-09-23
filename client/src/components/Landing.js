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
      redirect_board: false
    }

    this.handleJoinImpulse = this.handleJoinImpulse.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRedirectBoard = this.handleRedirectBoard.bind(this);
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

  redirectBoard() {
    this.setState({ redirect_board: true });
  }

  renderRedirect() {
    if (this.state.redirect_board) return <Redirect to={PATH_BOARD} />
  }

  render() {
    return (
      <div className="Landing">
        {this.renderRedirect()}
        <Login />
        <form onSubmit={this.handleJoinImpulse}>
          { this.state.invalid_hash && <p>Invalid hash!</p> }
          <label>Join Impulse:</label>
          <input type="text" 
            value={this.state.impulse_hash}
            onChange={this.handleChange} />
          <input type="submit" />
        </form>
        <button onClick={this.redirectBoard}>Continue without signing in</button>
      </div>
    );
  }
}

export default Landing;

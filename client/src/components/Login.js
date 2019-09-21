import React from 'react';
import { connect } from 'react-redux';

import { API_ROOT, HEADERS } from '../constants';
import { loginAccount } from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    }

    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangePassword(e) {
    this.setState({password: e.target.value});
  }

  handleChangeEmail(e) {
    this.setState({email: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.loginAccount(this.state.email, this.state.password);
  }

  render() {
    return (
      <div className="login">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Email</label>
          <br />
          <input
            type="text"
            value={this.state.email}
            onChange={this.handleChangeEmail}/>
          <br />
          <label>Password</label>
          <br />
          <input
            type="password"
            value={this.state.password}
            onChange={this.handleChangePassword}/>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default connect(null, {
  loginAccount
})(Login);
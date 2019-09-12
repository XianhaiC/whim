import React from 'react';
import { API_ROOT, HEADERS } from '../constants';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChangePassword = e => {
    this.setState({password: e.target.value});
  }

  handleChangeEmail = e => {
    this.setState({email: e.target.value});
  }

  handleSubmit = e => {
    e.preventDefault();
    fetch(`${API_ROOT}/login`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(auth_payload => {

        // persist the login for the session
        sessionStorage.setItem('account_session_token', auth_payload['auth_token']);
        sessionStorage.setItem('login_account_id', auth_payload['account']['id']);
        this.props.onLogin(auth_payload);
      })
  }

  render = () => {
    return (
      <div className="login">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Handle</label>
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
export default LoginForm;

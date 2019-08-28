import React from 'react';
import { API_ROOT, HEADERS } from '../constants';

class LoginForm extends React.Component {
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
        localStorage.setItem('login_session_token', auth_payload['auth_token']);
        this.props.onLogin(auth_payload);
      })
  }

  render = () => {
    return (
      <div className="LoginForm card bg-light">
        <div className="LoginFormBody card-body">
          <h1>Login</h1>
          <form onSubmit={this.handleSubmit}>
            <label>Handle</label>
            <br />
            <input 
              type="text"
              value={this.state.email}
              onChange={this.handleChangeEmail}
            />
            <br />
            <label>Password</label>
            <br />
            <input 
              type="password"
              value={this.state.password}
              onChange={this.handleChangePassword}
            />
            <input type="submit" />
          </form>
        </div>
      </div>
    );
  }
}
export default LoginForm;

import React from 'react';
import { connect } from 'react-redux';

import history from '../history';
import { loginAccount } from '../actions/index';
import { PATH_BOARD } from '../constants';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
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

  componentDidUpdate() {
    if (this.props.loggedIn) {
      window.location.reload();
      history.push(PATH_BOARD);
    }
  }

  render() {
    return (
      <div className="login center-form">
        <div className="center-form-wrapper">
          <h1>Log In</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              className="center-form-field"
              type="text"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChangeEmail}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              title="Valid email must be provided"
              required />
            <input
              className="center-form-field"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChangePassword}
              pattern=".{6,}"
              title="Must contain at least 6 or more characters"
              required />
              {
                this.props.passwordWrongError && 
                <p className="center-form-error">
                  Password for username is incorrect
                </p>
              }
            <input className="center-form-submit" type="submit" value="Submit"/>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.session.loggedIn,
    passwordWrongError: state.control.passwordWrongError,
    loginVerified: state.control.loginVerified,
  };
};

export default connect(mapStateToProps, {
  loginAccount
})(Login);

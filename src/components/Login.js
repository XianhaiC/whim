import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

import { API_ROOT, HEADERS } from '../constants';
import { loginAccount } from '../actions/index';
import { PATH_BOARD } from '../constants';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      shouldRender: false,
      didSubmit: false,
      emailBlank: false,
      passBlank: false,
      passwordWrongErr: false,
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

  handleErrors() {
    this.setState({emailBlank: false, passBlank: false});
    const { email, password } = this.state;
    var noerr = true; 
    var emailErr = email.trim() === '';
    var passErr = password.trim() === '';
    console.log("password blank flag expect false");
    console.log(passErr);
    if (emailErr) {
      this.setState({emailBlank: true});
      noerr = false;
    }
    if (passErr) {
      this.setState({passBlank: true});
      noerr = false;
    }
    return noerr;
  }

  handleSubmit(e) {
    e.preventDefault();
    var noErrors = this.handleErrors();
    if (noErrors) { 
      this.props.loginAccount(this.state.email, this.state.password, this.loginVerified); 
    }
    this.setState({didSubmit: true});
  }

  renderRedirect() {
    if (this.state.shouldRender) {
      return <Redirect to={PATH_BOARD}/>
    }
  }

  componentDidUpdate() {
    if (this.props.loggedIn && this.props.passwordWrongErr) {
      this.setState({shouldRender: true});
    }
  }

  render() {
    console.log("LOGIN ACCOUNT");
    console.log(this.props.loggedIn);

    const { emailBlank, passBlank, didSubmit } = this.state;
    const { passwordWrongErr } = this.props;

    return (
      <div className="login center-form">
        {this.renderRedirect()}
        {(emailBlank && didSubmit) ? <p>Username cannot be blank</p> : null}
        {(passwordWrongErr && didSubmit) ? <p>Username or password is incorrect</p> : null}
        {(passBlank && didSubmit) ? <p>Password cannot be blank</p> : null}
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Email</label>
          <br />
          <input
            type="text"
            value={this.state.email}
            onChange={this.handleChangeEmail}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            title="Valid email must be provided" />
          <br />
          <label>Password</label>
          <br />
          <input
            type="password"
            value={this.state.password}
            onChange={this.handleChangePassword}
            pattern=".{6,}"
            title="Must contain at least 6 or more characters"/>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.session.loggedIn,
  };
};

export default withRouter(connect(mapStateToProps, {
  loginAccount
})(Login));

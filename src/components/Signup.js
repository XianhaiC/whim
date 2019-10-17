import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

import history from '../history';
import { API_ROOT, HEADERS } from '../constants';
import { signupAccount } from '../actions/index';
import { PATH_LOGIN } from '../constants';

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      handle: '',
      email: '',
      password: '',
      confirmPassword: '',
      renderCreated: false,
      didSubmit: false,
    }

    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePasswordConfirm = this.handlePasswordConfirm.bind(this);
    this.Created = this.Created.bind(this);
  }

  handleChangePassword(e) {
    this.setState({password: e.target.value});
  }

  handleChangeEmail(e) {
    this.setState({email: e.target.value});
  }

  handlePasswordConfirm(e) {
    this.setState({confirmPassword: e.target.value});

    if(this.refs.password.value != this.refs.confirmPassword.value) {
      this.refs.confirmPassword.setCustomValidity("Passwords do not match");
    }
    else {
      this.refs.confirmPassword.setCustomValidity('');
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.signupAccount( this.state.handle, this.state.email,
                            this.state.password, this.state.passwordConfirm);
    this.setState({didSubmit: true});
  }

  handleChangeUsername(e) {
    this.setState({handle: e.target.value});
  }

  componentDidUpdate() {
    if(this.props.signupVerified && this.state.didSubmit &&
        !this.props.usernameTakenError &&
        !this.props.emailTakenError &&
        !this.state.renderCreated) {
      this.setState({ renderCreated: true });
    }
  }

  Created() {
    return (
      <div className="signup-created">
        <h1>Your account has been created!</h1>
        <h2>Check your email for the activation link.</h2>
        <button onClick={() => history.push(PATH_LOGIN)}>Back to login</button>
      </div>
    );
  }

  render() {
    const {usernameTakenError, emailTakenError} = this.props;
    const { didSubmit } = this.state;
    if (this.props.loggedIn) return null;

    // if the user has created their account
    if (this.state.renderCreated) return <this.Created />;

    return (
      <div className="signup center-form">
        <div className="center-form-wrapper">
          <h1>Sign up</h1>
          <form onSubmit={this.handleSubmit}>
            <input 
              className="center-form-field"
              type="text"
              placeholder="Username"
              value={this.state.handle}
              pattern="^[-a-zA-Z0-9@\.+_]+$"
              maxLength="50"
              title="Must not contain white space and can only contains numbers and letters"
              onChange={this.handleChangeUsername}
              required />
            <input
              className="center-form-field"
              type="text"
              placeholder="Email"
              value={this.state.email}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              maxLength="255"
              title="Must provide a valid email"
              onChange={this.handleChangeEmail}
              required />
            <input
              className="center-form-field"
              ref="password"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChangePassword}
              pattern=".{6,}"
              title="Must contain at least 6 or more characters"
              required />
            <input
              className="center-form-field"
              ref="confirmPassword"
              type="password"
              placeholder="Confirm password"
              value={this.state.confirmPassword}
              onChange={this.handlePasswordConfirm}
              pattern=".{6,}"
              required />

            {usernameTakenError ? <p>Username has been taken</p> : null }
            {emailTakenError ? <p>Email has been taken</p> : null}

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
    emailTakenError: state.control.emailTakenError, 
    usernameTakenError: state.control.usernameTakenError,
    signupVerified: state.control.signupVerified,
  };
};

export default withRouter(connect(mapStateToProps, {
  signupAccount
})(Signup));

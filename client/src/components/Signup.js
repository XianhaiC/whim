import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

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
      password_confirm: '',
      passwordsMatch: false,
      shouldRender: false, 
      didSubmit: false,
    }

    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePasswordConfirm = this.handlePasswordConfirm.bind(this);
    this.handleErrrors = this.handleErrors.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
  }

  handleChangePassword(e) {
    this.setState({password: e.target.value});
  }

  handleChangeEmail(e) {
    this.setState({email: e.target.value});
  }

  handlePasswordConfirm(e) {
    this.setState({password_confirm: e.target.value});
    
    if(this.refs.password.value != this.refs.confirm_password.value) {
      this.refs.confirm_password.setCustomValidity("Passwords do not match");
      this.setState({passwordsMatch: false});
    }
    else {
      this.refs.confirm_password.setCustomValidity('');
      this.setState({passwordsMatch: true});
    }
  }

  handleErrors() {

    const {handle, email, password } = this.state;
    var userBlank = handle.trim() === '';
    var emailBlank = email.trim() === '';
    var passBlank = password.trim() === '';
    if (userBlank) {
      return false;
    }
    else if (emailBlank) {
      return false;
    }
    else if (passBlank) {
      return false;
    }
    else {
      return true; 
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    var noErrors = this.handleErrors();
    if (noErrors) {
      this.props.signupAccount( this.state.handle, this.state.email,
                              this.state.password, this.state.password_confirmation);
    }
    this.setState({didSubmit: true});
  }

  handleChangeUsername(e) {
    this.setState({handle: e.target.value});
  }

  
  renderRedirect= () => {
    if (this.state.shouldRender) {
      return <Redirect to={PATH_LOGIN}/>
    }
  }

  componentDidUpdate() {
    if(this.props.signupVerified && this.state.didSubmit &&
        !this.props.usernameTakenError &&
        !this.props.emailTakenError &&
        !this.state.shouldRender) {
      this.setState({shouldRender: true});
    }
  }

  render() {
    const {usernameTakenError, emailTakenError} = this.props;
    const {handle, email, password, password_confirm, 
           passwordsMatch, didSubmit } = this.state;
    var userEmpty = handle.trim() === '';
    var emailEmpty = email.trim() === '';
    var passEmpty = password.trim() === '';
    var passconfirmEmpty = password_confirm.trim() === '';
    console.log("REDIRECT SET");
    console.log(this.state.shouldRender);
    if (this.props.loggedIn) return null;

    return (
      <div className="signup">
        {this.renderRedirect()}
        {(userEmpty && didSubmit) ? <p>Username cannot be blank</p> : null}
        {(emailEmpty && didSubmit) ? <p>Email cannot be blank</p> : null}
        {(passEmpty && didSubmit) ? <p>Password cannot be blank</p> : null}
        {((passconfirmEmpty || !passwordsMatch) && didSubmit) ? <p>Passwords must match</p> : null}
        {usernameTakenError ? <p>Username has been taken</p> : null }
        {emailTakenError ? <p>Email has been taken</p> : null}
        <h1>Sign up</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Username</label>
          <br />
          <input 
            type="text"
            value={this.state.handle}
            pattern="^[-a-zA-Z0-9@\.+_]+$"
            maxLength="50"
            title="Must not contain white space and can only contains numbers and letters"
            onChange={this.handleChangeUsername}/>
          <br />
          <label>Email</label>
          <br />
          <input
            type="text"
            value={this.state.email}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            maxLength="255"
            title="Must provide a valid email"
            onChange={this.handleChangeEmail}/>
          <br />
          <label>Password</label>
          <br />
          <input
            ref="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChangePassword}
            pattern=".{6,}"
            title="Must contain at least 6 or more characters"/>
          <br />
          <label>Confirm Password</label>
          <br />
          <input
            ref="confirm_password"
            type="password"
            value={this.state.password_confirm}
            onChange={this.handlePasswordConfirm}
            pattern=".{6,}" />

          <input type="submit" />
        </form>
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

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
      shouldRender: false
    }

    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePasswordConfirm = this.handlePasswordConfirm.bind(this);
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
    }
    else {
      this.refs.confirm_password.setCustomValidity('');
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.signupAccount(this.state.handle, this.state.email, this.state.password, this.state.password_confirm);
    this.setState({shouldRender: true});
    console.log("PASSWORD: ");
    console.log(this.state.password);
    console.log("PASSWORDCONFIRM: ");
    console.log(this.state.password_confirm);
  }

  handleChangeUsername(e) {
    this.setState({handle: e.target.value});
  }

  renderRedirect= () => {
    if (this.state.shouldRender) {
      return <Redirect to={PATH_LOGIN}/>
    }
  }

  render() {
    console.log(this.props.loggedIn);
    if (this.props.loggedIn) return null;

    return (
      <div className="signup">
        {this.renderRedirect()}
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
    loggedIn: state.session.loggedIn
  };
};

export default withRouter(connect(mapStateToProps, {
  signupAccount
})(Signup));

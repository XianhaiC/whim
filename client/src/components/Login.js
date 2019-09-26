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
      shouldRender: false
    }

    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
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
    this.setState({shouldRender: true});
  }

  renderRedirect= () => {
    if (this.state.shouldRender) {
      return <Redirect to={PATH_BOARD}/>
    }
  }

  render() {
    console.log("LOGIN :)");
    console.log(this.props.loggedIn);
    if (this.props.loggedIn) return null;

    return (
      <div className="login">
        {this.renderRedirect()}
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

const mapStateToProps = state => {
  return {
    loggedIn: state.session.loggedIn
  };
};

export default withRouter(connect(mapStateToProps, {
  loginAccount
})(Login));

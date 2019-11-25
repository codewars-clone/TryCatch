import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../store/signIn';
import { Redirect } from 'react-router-dom';

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleEmailChange = ({ target }) => {
    this.setState({
      email: target.value,
    });
  };
  handlePasswordChange = ({ target }) => {
    this.setState({
      password: target.value,
    });
  };
  handleSubmit = () => {
    const { dispatch } = this.props;
    const { email, password } = this.state;

    dispatch(loginUser(email, password));
  };
  render() {
    const { loginError, isAuthenticated } = this.props;
    if (isAuthenticated) {
      return <Redirect to="/try" />;
    } else {
      return (
        <div className="container">
          <form onSubmit={this.handleSubmit} className="white">
            <h5 className="grey-text text-darken-3">Sign In</h5>
            <div className="input-filed">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                onChange={this.handleEmailChange}
              />
            </div>
            <div className="input-filed">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                onChange={this.handlePasswordChange}
              />
              {loginError && (
                <p className="error">Incorrect email or password.</p>
              )}
            </div>
            <div className="input-field">
              <button type="submit" className="button">
                Login
              </button>
            </div>
          </form>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    isLoggingIn: state.auth.isLoggingIn,
    loginError: state.auth.loginError,
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps)(SignIn);

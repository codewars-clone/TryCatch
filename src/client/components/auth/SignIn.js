import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../store/signIn';
import { Redirect } from 'react-router-dom';

export default class SignIn extends Component {
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
    console.log(this.state);
    // const { dispatch } = this.props;
    // const { email, password } = this.state;

    // dispatch(loginUser(email, password));
  };
  render() {
    // const { loginError, isAuthenticated } = this.props;
    // if (isAuthenticated) {
    //   return <Redirect to="/try" />;
    // } else {
    return (
      <section className="section">
        <form onSubmit={this.handleSubmit} className="container">
          <div className="title" size="is-full">
            <h1>Sign In</h1>
          </div>

          {/* <h2 className="column">Sign In</h2> */}
          {/* EMAIL */}
          <div className="field">
            <label className="label">Email</label>
            <div className="control has-icons-left has-icons-right">
              <input
                type="email"
                className="input"
                placeholder="Email input"
                onChange={this.handleEmailChange}
              />
              <span className="icon is-small is-left">
                <icon className="fas fa-envelope"></icon>
              </span>
              <span className="icon is-small is-right">
                <icon className="fas fa-exclamation-triangle"></icon>
              </span>
            </div>
          </div>
          {/* PASSWORD */}
          <div className="field">
            <label className="label">Password</label>
            <p className="control has-icons-left">
              <input
                type="password"
                className="input"
                onChange={this.handlePasswordChange}
                placeholder="password"
              />
              <span className="icon is-small is-left">
                <icon className="fas fa-lock"></icon>
              </span>

              {/* {loginError && (
              <p className="error">Incorrect email or password.</p>
            )} */}
            </p>
          </div>
          <div className="column">
            <button type="submit" className="button is-danger">
              Login
            </button>
          </div>
        </form>
      </section>
    );
  }
}
// }

// const mapStateToProps = state => {
//   return {
//     isLoggingIn: state.auth.isLoggingIn,
//     loginError: state.auth.loginError,
//     isAuthenticated: state.auth.isAuthenticated,
//   };
// };

// export default connect(mapStateToProps)(SignIn);

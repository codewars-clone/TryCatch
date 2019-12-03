import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../store/reducers/auth';
import { Redirect } from 'react-router-dom';
import TryImage from './try.png';
import { Link } from 'react-router-dom';

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { signInThunk } = this.props;
    signInThunk(this.state.email, this.state.password);
  };
  render() {
    const { loginError, isAuthenticated } = this.props;
    if (isAuthenticated) {
      return <Redirect to="/try" />;
    } else {
      return (
        <div id="sign-in-bg">
          <section
            className="section"
            style={{
              backgroundImage: `url(${TryImage})`,
              backgroundRepeat: 'no-repeat',
            }}
          >
            <form
              id="sign-in-form"
              onSubmit={this.handleSubmit}
              className="container"
            >
              {/* <div className="title" size="is-full">
              <h1>Sign In</h1>
            </div> */}
              {/* EMAIL */}
              <div className="field">
                <label className="label has-text-white">Email</label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    type="email"
                    id="email"
                    className="input"
                    placeholder="Email input"
                    onChange={this.handleChange}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                  <span className="icon is-small is-right">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                </div>
              </div>
              {/* PASSWORD */}
              <div className="field">
                <label className="label has-text-white">Password</label>
                <p className="control has-icons-left">
                  <input
                    type="password"
                    id="password"
                    className="input"
                    onChange={this.handleChange}
                    placeholder="password"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-lock"></i>
                  </span>
                </p>
                {loginError && (
                  <p className="error has-text-white">
                    Incorrect email or password.
                  </p>
                )}
              </div>
              <div className="column" id="loggin">
                <button type="submit" className="button is-danger">
                  Login
                </button>
              </div>
              <div id="loggin">
                <Link to="/signup">
                  <h5 className="title is-5 has-text-white">Sign Up</h5>
                </Link>
              </div>
            </form>
          </section>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    isLoggingIn: state.auth.isLoggingIn,
    loginError: state.auth.loginError,
    isAuthenticated: state.auth.isAuthenticated,
  };
};

const mapDispatchToProps = dispatch => ({
  signInThunk(email, password) {
    dispatch(loginUser(email, password));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

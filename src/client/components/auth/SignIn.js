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
      inputColor: 'is-danger'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });

    this.checkPasswordLength();
  }

  // Validate Password length
  checkPasswordLength()  { 
    if(this.state.password.length >= 7) {
      this.setState({
        inputColor: 'is-success'
      })
    }
    else {
      this.setState({
        inputColor: 'is-danger'
      })
    }
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
            id="bg-img"
            style={{
              background: `url(${TryImage}) no-repeat center`,
            }}
          >
            <form
              id="sign-in-form"
              onSubmit={this.handleSubmit}
              className="container"
            >
              {/* EMAIL */}
              <div className="field">
                <label className="label has-text-white">Email</label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    type="email"
                    id="email"
                    className="input"
                    placeholder="Email"
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
                    className={`input ${this.state.inputColor}`}
                    onChange={this.handleChange}
                    placeholder="Password"
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
              <div className="column" id="login">
                <button type="submit" className="button is-danger is-large">
                  Login
                </button>
              </div>
              <div className="column" id="login">
                <p className="title is-5" id="acc">
                  Don't have an account?
                </p>
              </div>
              <div className="column" id="login">
                <Link to="/signup">
                  <button className="button is-danger is-wide">Sign Up</button>
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

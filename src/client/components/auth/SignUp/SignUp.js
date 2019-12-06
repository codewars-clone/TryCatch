import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signUpUser } from '../../../store/reducers/auth';

class NewSignUp extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      MM: '',
      DD: '',
      YYYY: '',
      DOB: '',
      age: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.calcAge = this.calcAge.bind(this);
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = () => {
    const { age, DOB } = this.calcAge();
    const { signUpThunk } = this.props;
    let { email, password, name } = this.state;
    const userData = {
      age: age,
      dob: DOB,
      name: name,
    };
    signUpThunk(email, password, userData);
    this.props.history.push('/info');
  };

  calcAge = () => {
    const { YYYY, MM, DD } = this.state;
    const dateString = `${YYYY}-${MM}-${DD}`;
    const birthday = new Date(dateString);
    const age = ~~((Date.now() - birthday) / 31557600000);
    return {
      age: age,
      DOB: birthday,
    };
  };

  render() {
    const { name, email, MM, DD, YYYY, password } = this.state;
    return (
      <section className="section">
        <div className="container">
          {/* FIRST NAME */}
          <div className="field">
            <label className="label">First Name</label>
            <div className="control">
              <input
                type="text"
                className="input"
                placeholder="Enter your first name"
                value={name}
                name="name"
                onChange={this.handleChange}
              />
            </div>
          </div>
          {/* EMAIL */}
          <div className="field">
            <label className="label">Email</label>
            <div className="control has-icons-left has-icons-right">
              <input
                type="email"
                className="input"
                placeholder="Enter a valid email"
                value={email}
                name="email"
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
            <label className="label">Password</label>
            <p className="control has-icons-left">
              <input
                type="password"
                name="password"
                className="input"
                value={password}
                onChange={this.handleChange}
                placeholder="Enter a secure password"
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </p>
          </div>
          {/* DOB */}
          <label className="label">Date of Birth</label>
          <div className="field is-horizontal">
            <input
              className="input"
              maxLength="2"
              type="tel"
              name="MM"
              value={MM}
              onChange={this.handleChange}
              style={{ width: '5em' }}
              placeholder="MM"
            ></input>
            <input
              className="input"
              maxLength="2"
              type="tel"
              name="DD"
              value={DD}
              onChange={this.handleChange}
              style={{ width: '5em' }}
              placeholder="DD"
            ></input>
            <input
              className="input"
              maxLength="4"
              type="tel"
              name="YYYY"
              value={YYYY}
              onChange={this.handleChange}
              style={{ width: '6em' }}
              placeholder="YYYY"
            ></input>
          </div>
          <div className="buttons">
            <button
              className="button is-info"
              onClick={() => {
                this.handleSubmit();
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signUpThunk(email, password, state) {
    dispatch(signUpUser(email, password, state));
  },
});

export default connect(null, mapDispatchToProps)(NewSignUp);

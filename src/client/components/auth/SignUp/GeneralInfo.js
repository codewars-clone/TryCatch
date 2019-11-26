import React, { Component } from 'react';
import Calendar from 'react-calendar';

export default class GeneralInfo extends Component {
  constructor() {
    super();
    this.continue = this.continue.bind(this);
  }

  continue(e) {
    e.preventDefault();
    this.props.nextStep();
  }

  render() {
    const {
      firstName,
      email,
      DOB,
      gender,
      password,
      handleChange,
    } = this.props;
    console.log('TCL: GeneralInfo -> render -> DOB,', DOB);
    return (
      <section className="section">
        <div className="container">
          <h1 className="title">General Info</h1>
          {/* FIRST NAME */}
          <div className="field">
            <label className="label">First Name</label>
            <div className="control">
              <input
                type="text"
                className="input"
                placeholder="Enter your first name"
                value={firstName}
                name="firstName"
                onChange={handleChange('firstName')}
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
                onChange={handleChange('email')}
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
                value={password}
                onChange={handleChange('password')}
                placeholder="Enter a secure password"
              />
              <span className="icon is-small is-left">
                <icon className="fas fa-lock"></icon>
              </span>
            </p>
          </div>
          {/* GENDER*/}
          <div className="fiel">
            <label className="label"></label>
          </div>
          {/* DOB */}
          <div className="field">
            <label className="label">Date of Birth</label>
            <Calendar value={DOB} />
          </div>
          <div className="buttons">
            <button className="button is-info" onClick={this.continue}>
              Save and Continue
            </button>
          </div>
        </div>
      </section>
    );
  }
}

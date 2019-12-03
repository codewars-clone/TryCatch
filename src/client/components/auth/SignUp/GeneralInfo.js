import React, { Component } from 'react';

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
      name,
      email,
      MM,
      DD,
      YYYY,
      password,
      handleChange,
      calcAge,
    } = this.props;
    return (
      <section className="section">
        <div className="container">
          <h1 className="title">General Info</h1>
          <progress className="progress is-small is-info" value="15" max="100">
            15%
          </progress>
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
              onChange={handleChange}
              style={{ width: '5em' }}
              placeholder="MM"
            ></input>
            <input
              className="input"
              maxLength="2"
              type="tel"
              name="DD"
              value={DD}
              onChange={handleChange}
              style={{ width: '5em' }}
              placeholder="DD"
            ></input>
            <input
              className="input"
              maxLength="4"
              type="tel"
              name="YYYY"
              value={YYYY}
              onChange={handleChange}
              style={{ width: '6em' }}
              placeholder="YYYY"
            ></input>
          </div>
          <div className="buttons">
            <button
              className="button is-info"
              onClick={e => {
                this.continue(e);
                calcAge();
              }}
            >
              Save and Continue
            </button>
          </div>
        </div>
      </section>
    );
  }
}

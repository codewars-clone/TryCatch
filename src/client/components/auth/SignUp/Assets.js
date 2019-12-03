import React, { Component } from 'react';

export default class Assets extends Component {
  constructor() {
    super();
    this.continue = this.continue.bind(this);
    this.back = this.back.bind(this);
  }

  continue(e) {
    e.preventDefault();
    this.props.nextStep();
  }

  back(e) {
    e.preventDefault();
    this.props.prevStep();
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <h1 className="title">Assets</h1>
          <progress className="progress is-small is-info" value="65" max="100">
            65%
          </progress>
          {/* Operating System */}
          <div className="field">
            <label className="label">Operating System</label>
            <div className="select is-multiple is-medium">
              <select multiple size="4">
                <option value="windows">Windows</option>
                <option value="linux">Linux</option>
                <option value="mac-os">Mac OS</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          {/* FAVORITE LANGUAGE */}
          <div className="field">
            <label className="label">Favorite Language</label>
            <div className="control is-medium">
              <input
                type="text"
                className="input"
                placeholder="Javascript..?"
              />
            </div>
          </div>
          {/* BUTTONS */}
          <div className="buttons">
            <button className="button is-danger" onClick={this.back}>
              Back
            </button>
            <button className="button is-info" onClick={this.continue}>
              Save and continue
            </button>
          </div>
        </div>
      </section>
    );
  }
}

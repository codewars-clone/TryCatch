import React, { Component } from 'react';

export default class Preferences extends Component {
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
          <h1 className="title">Preferences</h1>
          {/* MEET UP */}
          <div className="field">
            <label className="label">Meet UP</label>
            <div className="select is-multiple">
              <select multiple size="2">
                <option value="pair-program">Pair Program</option>
                <option value="work-remote">Work Remote</option>
              </select>
            </div>
          </div>
          {/* AGE INTEREST */}
          <div className="field">
            <label className="label">Age Interest</label>
            <div className="select is-multiple">
              <select multiple size="5" onChange={this.handleChange}>
                <option value="18-25">18-25</option>
                <option value="26-33">26-33</option>
                <option value="33-41">33-41</option>
                <option value="41-65">41-65</option>
                <option value="65+">65+</option>
              </select>
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

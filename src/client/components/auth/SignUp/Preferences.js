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
    const {
      ageInterest,
      prefGender,
      meetUp,
      handleChange,
      parsePreferences,
    } = this.props;
    return (
      <section className="section">
        <div className="container">
          <h1 className="title">Preferences</h1>
          <progress className="progress is-small is-info" value="45" max="100">
            45%
          </progress>
          {/* MEET UP */}
          <div className="field">
            <label className="label">Meet Up</label>
            <div className="select is-multiple is-medium">
              <select multiple size="2">
                <option value="pair-program">Pair Program</option>
                <option value="work-remote">Work Remote</option>
              </select>
            </div>
          </div>
          {/* AGE INTEREST */}
          <div className="field">
            <label className="label">Age Interest</label>
            <div className="select is-medium">
              <select
                name="ageInterest"
                value={ageInterest}
                onChange={handleChange}
              >
                <option value="18:25">18-25</option>
                <option value="26:33">26-33</option>
                <option value="33:41">33-41</option>
                <option value="41:65">41-65</option>
                <option value="65:115">65+</option>
              </select>
            </div>
          </div>
          {/* PREF GENDER */}
          <div className="field">
            <label className="label">Preferred Gender</label>
            <div className="select is-medium">
              <select
                name="prefGender"
                value={prefGender}
                onChange={handleChange}
              >
                <option default value="Male">
                  Male
                </option>
                <option value="Female">Female</option>
                <option value="Everyone">Everyone</option>
              </select>
            </div>
          </div>
          {/* BUTTONS */}
          <div className="buttons">
            <button className="button is-danger" onClick={this.back}>
              Back
            </button>
            <button
              className="button is-info"
              onClick={e => {
                this.continue(e);
                parsePreferences();
              }}
            >
              Save and continue
            </button>
          </div>
        </div>
      </section>
    );
  }
}

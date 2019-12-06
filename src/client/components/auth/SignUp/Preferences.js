import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../../store/reducers/auth';

export class NewPreferences extends Component {
  constructor() {
    super();
    this.state = {
      ageInterest: '',
      prefGender: '',
      meetUp: '',
    };
  }

  parsePreferences() {
    const { ageInterest } = this.state;
    if (ageInterest !== '') {
      const arr = ageInterest.split(':').map(ele => Number(ele));
      return arr;
    } else {
      return [18, 25];
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleUpdate() {
    let ageInterest = this.parsePreferences();
    const { prefGender, meetUp } = this.state;
    const userData = {
      preferences: {
        age: ageInterest,
        gender: prefGender,
        meetUp: meetUp,
      },
    };
    this.props.addToUser(userData);
    this.props.history.push('/assets');
  }

  render() {
    const { ageInterest, prefGender, meetUp } = this.state;
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
            <div className="select is-medium">
              <select name="meetUp" value={meetUp} onChange={this.handleChange}>
                <option defaultValue="">Select</option>
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
                onChange={this.handleChange}
              >
                <option defaultValue="">Select</option>
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
                onChange={this.handleChange}
              >
                <option defaultValue="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Everyone">Everyone</option>
              </select>
            </div>
          </div>
          {/* BUTTONS */}
          <div className="buttons">
            <button
              className="button is-danger"
              onClick={() => {
                this.props.history.push('/info');
              }}
            >
              Back
            </button>
            <button
              className="button is-info"
              onClick={e => {
                this.handleUpdate();
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

const mapDispatchToProps = dispatch => ({
  addToUser: data => dispatch(updateUser(data)),
});

export default connect(null, mapDispatchToProps)(NewPreferences);

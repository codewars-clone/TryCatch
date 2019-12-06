import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../../store/reducers/auth';

export class NewAssets extends Component {
  constructor() {
    super();
    this.state = {
      OS: [],
      codeChallenege: '',
      favoriteLang: '',
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleMultiChange = e => {
    this.setState({ OS: e.option });
    console.log(this.state);
  };

  handleUpdate = () => {
    const { OS, codeChallenge, favoriteLang } = this.state;
    const userData = {
      OS: OS,
      codeChallenge: codeChallenge,
      favoriteLang: favoriteLang,
    };
    this.props.addToUser(userData);
    this.props.history.push('/terms');
  };

  render() {
    const { OS, codeChallenge, favoriteLang } = this.state;
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
              <select multiple={true} size="4" name="OS">
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
                name="favoriteLang"
                value={favoriteLang}
                onChange={this.handleChange}
                maxLength="13"
                className="input"
                placeholder="Javascript..?"
              />
            </div>
          </div>
          {/* CODING CHALLENGE */}
          <div className="field">
            <label className="label">Coding Challenge</label>
            <div className="select is-medium">
              <select
                name="codeChallenge"
                value={codeChallenge}
                onChange={this.handleChange}
              >
                <option defaultValue="">Select</option>
                <option value="Reverse a linked list">
                  Reverse a linked list
                </option>
                <option value="Find the longest palindrome in a string">
                  Find the longest palindrome in string
                </option>
                <option value="Sort an array of N integers">
                  Sort an array of N integers
                </option>
              </select>
            </div>
          </div>
          {/* BUTTONS */}
          <div className="buttons">
            <button
              className="button is-danger"
              onClick={() => {
                this.props.history.push('/preferences');
              }}
            >
              Back
            </button>
            <button
              className="button is-info"
              onClick={() => {
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

export default connect(null, mapDispatchToProps)(NewAssets);

import React, { Component } from 'react';
import ImageUpload from './ImageUpload';

export default class AdditionalInfo extends Component {
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
      gender,
      handleChange,
      handleUpload,
      handleImageChange,
      hFeet,
      hInches,
      image,
      imageUrl,
    } = this.props;
    return (
      <section className="section">
        <div className="container">
          <h1 className="title">Additonal Info</h1>
          <progress className="progress is-small is-info" value="30" max="100">
            30%
          </progress>
          {/* GENDER & HEIGHT */}
          <div className="field is-horizontal">
            <div className="field-body">
              <div className="field">
                <label className="label">Gender</label>
                <div className="select">
                  <select name="gender" onChange={handleChange} value={gender}>
                    <option default value="Male">
                      Male
                    </option>
                    <option value="Female">Female</option>
                    <option value="Non-binary">Non-binary</option>
                  </select>
                </div>
              </div>
              <div className="field">
                <label className="label">Height</label>
                <input
                  className="input"
                  maxLength="2"
                  type="tel"
                  name="hFeet"
                  onChange={handleChange}
                  value={hFeet}
                  style={{ width: '5em' }}
                  placeholder="ft"
                ></input>
                <input
                  className="input"
                  maxLength="2"
                  type="tel"
                  name="hInches"
                  onChange={handleChange}
                  value={hInches}
                  style={{ width: '5em' }}
                  placeholder="in"
                ></input>
              </div>
            </div>
          </div>
          <br />
          <ImageUpload
            handleImageChange={handleImageChange}
            handleUpload={handleUpload}
            image={image}
            imageUrl={imageUrl}
          />
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

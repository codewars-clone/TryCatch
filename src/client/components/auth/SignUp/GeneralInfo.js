import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImageUpload from './ImageUpload';
import { storage } from '../../../store/index';
import { updateUser } from '../../../store/reducers/auth';

export class NewInfo extends Component {
  constructor() {
    super();
    this.state = {
      image: {
        name: '',
      },
      imageUrl: '',
      hFeet: '',
      hInches: '',
      gender: '',
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleImageChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
  };

  handleUpload = () => {
    const { image, hFeet, hInches, gender } = this.state;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      error => {
        console.log(error);
      },
      async () => {
        let imageUrl = await storage
          .ref('images')
          .child(image.name)
          .getDownloadURL();
        const userData = {
          imageUrl: imageUrl,
          height: `${hFeet}'${hInches}`,
          gender: gender,
        };
        this.props.addToUser(userData);
        this.props.history.push('/preferences');
      }
    );
  };

  handleUpdate = async () => {
    const { hFeet, hInches, gender } = this.state;
    if (this.state.image.name) {
      this.handleUpload();
    } else {
      let imageUrl =
        'https://cnam.ca/wp-content/uploads/2018/06/default-profile.gif';
      const userData = {
        imageUrl: imageUrl,
        height: `${hFeet}'${hInches}`,
        gender: gender,
      };
      this.props.addToUser(userData);
      this.props.history.push('/preferences');
    }
  };

  render() {
    const { gender, hFeet, hInches, image, imageUrl } = this.state;
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
                  <select
                    name="gender"
                    onChange={this.handleChange}
                    value={gender}
                  >
                    <option defaultValue="">Select</option>
                    <option value="Male">Male</option>
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
                  onChange={this.handleChange}
                  value={hFeet}
                  style={{ width: '5em' }}
                  placeholder="ft"
                ></input>
                <input
                  className="input"
                  maxLength="2"
                  type="tel"
                  name="hInches"
                  onChange={this.handleChange}
                  value={hInches}
                  style={{ width: '5em' }}
                  placeholder="in"
                ></input>
              </div>
            </div>
          </div>
          <br />
          <ImageUpload
            handleImageChange={this.handleImageChange}
            handleUpload={this.handleUpload}
            image={image}
            imageUrl={imageUrl}
          />
          <br />
          {/* BUTTONS */}
          <div className="buttons">
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

export default connect(null, mapDispatchToProps)(NewInfo);

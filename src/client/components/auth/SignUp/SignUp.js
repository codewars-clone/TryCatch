/* eslint-disable no-duplicate-case */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { GeneralInfo, Location, Preferences, Assets, Terms } from '../../index';
import { signUpUser } from '../../../store/reducers/auth';
import { storage } from '../../../store/index';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      step: 1,
      name: '',
      MM: '',
      DD: '',
      YYYY: '',
      email: '',
      DOB: '',
      age: null,
      hFeet: '',
      hInches: '',
      password: '',
      location: '',
      gender: '',
      ageInterest: '',
      prefGender: '',
      meetUp: '',
      codeChallenge: '',
      sexualOrientation: '',
      favoriteLang: '',
      image: {
        name: '',
      },
      imageUrl: '',
    };
    this.nextStep = this.nextStep.bind(this);
    this.prevStep = this.prevStep.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.calcAge = this.calcAge.bind(this);
    this.parsePreferences = this.parsePreferences.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  parsePreferences() {
    const { ageInterest } = this.state;
    if (ageInterest !== '') {
      const arr = ageInterest.split(':').map(ele => Number(ele));
      this.setState({
        ageInterest: arr,
      });
    } else {
      this.setState({
        ageInterest: [18, 25],
      });
    }
    console.log(this.state);
  }

  calcAge() {
    const { YYYY, MM, DD } = this.state;
    const dateString = `${YYYY}-${MM}-${DD}`;
    const birthday = new Date(dateString);
    const age = ~~((Date.now() - birthday) / 31557600000);
    this.setState({
      age: age,
      DOB: birthday,
    });
  }

  nextStep() {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  }

  prevStep() {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
  }

  handleSignUp() {
    const { signUpThunk } = this.props;
    let {
      email,
      password,
      age,
      DOB,
      gender,
      name,
      hFeet,
      hInches,
      ageInterest,
      prefGender,
      imageUrl,
      codeChallenge,
      favoriteLang,
    } = this.state;
    if (!gender) {
      gender = 'Male';
    }
    if (!prefGender) {
      if (gender === 'Male') {
        prefGender = 'Female';
      } else if (gender === 'Female') {
        prefGender = 'Male';
      } else {
        prefGender = 'Everyone';
      }
    }
    if (!imageUrl) {
      imageUrl =
        'https://cnam.ca/wp-content/uploads/2018/06/default-profile.gif';
    }
    const userData = {
      age: age,
      dob: DOB,
      gender: gender,
      name: name,
      imageUrl: imageUrl,
      height: `${hFeet}'${hInches}`,
      codeChallenge: codeChallenge,
      favoriteLang: favoriteLang,
      preferences: {
        age: ageInterest,
        gender: prefGender,
      },
    };
    signUpThunk(email, password, userData);
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
    const { image } = this.state;
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
      () => {
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then(imageUrl => {
            this.setState({ imageUrl });
          });
      }
    );
  };

  render() {
    const {
      step,
      name,
      email,
      image,
      imageUrl,
      MM,
      DD,
      YYYY,
      gender,
      age,
      hFeet,
      hInches,
      password,
      ageInterest,
      meetUp,
      sexualOrientation,
      prefGender,
      codeChallenge,
      favoriteLang,
    } = this.state;
    // eslint-disable-next-line default-case
    switch (step) {
      case 1:
        return (
          <GeneralInfo
            name={name}
            email={email}
            MM={MM}
            DD={DD}
            YYYY={YYYY}
            age={age}
            password={password}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            calcAge={this.calcAge}
          />
        );
      case 2: {
        return (
          <Location
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            image={image}
            imageUrl={imageUrl}
            hFeet={hFeet}
            hInches={hInches}
            gender={gender}
            handleImageChange={this.handleImageChange}
            handleUpload={this.handleUpload}
            handleChange={this.handleChange}
          />
        );
      }
      case 3:
        return (
          <Preferences
            ageInterest={ageInterest}
            sexualOrientation={sexualOrientation}
            prefGender={prefGender}
            meetUp={meetUp}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            parsePreferences={this.parsePreferences}
          />
        );
      case 4:
        return (
          <Assets
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            codeChallenge={codeChallenge}
            favoriteLang={favoriteLang}
            handleChange={this.handleChange}
          />
        );
      case 5:
        return (
          <Terms
            prevStep={this.prevStep}
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            handleSignUp={this.handleSignUp}
          />
        );
    }
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    isAuthenticated: state.auth.isAuthenticated,
  };
};

const mapDispatchToProps = dispatch => ({
  signUpThunk(email, password, state) {
    dispatch(signUpUser(email, password, state));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

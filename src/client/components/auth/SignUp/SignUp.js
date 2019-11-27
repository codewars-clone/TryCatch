/* eslint-disable no-duplicate-case */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GeneralInfo, Location, Preferences, Assets, Terms } from '../../index';
import { signUpUser } from '../../../store/reducers/auth';

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
      password: '',
      location: '',
      gender: '',
      ageInterest: [],
      meetUp: '',
      sexualOrientation: '',
    };
    this.nextStep = this.nextStep.bind(this);
    this.prevStep = this.prevStep.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.calcAge = this.calcAge.bind(this);
    this.parsePreferences = this.parsePreferences.bind(this);
  }

  parsePreferences() {
    const { ageInterest } = this.state;
    if (typeof ageInterest === 'string') {
      const arr = ageInterest.split(':');
      this.setState({
        ageInterest: arr,
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
    const { email } = this.state;
    const { password } = this.state;
    const userData = {
      age: this.state.age,
      dob: this.state.DOB,
      gender: this.state.gender,
      name: this.state.name,
      preferences: {
        age: this.state.ageInterest,
        gender: 'Female',
      },
    };

    signUpThunk(email, password, userData);
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log(this.state);
  };

  render() {
    const {
      step,
      name,
      email,
      MM,
      DD,
      YYYY,
      gender,
      age,
      password,
      ageInterest,
      meetUp,
      sexualOrientation,
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
            gender={gender}
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
            handleChange={this.handleChange}
          />
        );
      }
      case 3:
        return (
          <Preferences
            ageInterest={ageInterest}
            sexualOrientation={sexualOrientation}
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
            handleChange={this.handleChange}
          />
        );
      case 5:
        return (
          <Terms
            prevStep={this.prevStep}
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

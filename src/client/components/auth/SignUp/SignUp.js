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
      firstName: '',
      DOB: '',
      email: '',
      age: '',
      password: '',
      location: '',
      gender: '',
      ageInterest: '',
      meetUp: '',
      sexualOrientation: '',
    };
    this.nextStep = this.nextStep.bind(this);
    this.prevStep = this.prevStep.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
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

    signUpThunk(email, password, this.state);
  }

  handleChange = input => e => {
    this.setState({
      [input]: e.target.value,
    });
  };

  render() {
    const {
      step,
      firstName,
      email,
      DOB,
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
            firstName={firstName}
            email={email}
            DOB={DOB}
            gender={gender}
            age={age}
            password={password}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
          />
        );
      case 2:
        return (
          <Location
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
          />
        );
      case 3:
        return (
          <Preferences
            ageInterest={ageInterest}
            sexualOrientation={sexualOrientation}
            meetUp={meetUp}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
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

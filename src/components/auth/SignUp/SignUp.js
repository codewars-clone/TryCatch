/* eslint-disable no-duplicate-case */
import React, { Component } from 'react';
import { GeneralInfo, Location, Preferences, Assets, Terms } from '../../index'

class SignUp extends Component {
  constructor() {
    super() 
    this.state = {
      step: 1,
      firstName:'',
      DOB: '',
      email: '',
      age: '',
      password: '',
      location: '',
      gender: '',
      ageIntrest: '',
      meetUp: '',
      sexualOrientation: ''
    }
    this.nextStep = this.nextStep.bind(this)
    this.prevStep = this.prevStep.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  nextStep() {
    const {step} = this.state
    this.setState({
      step: step + 1
    })
  }

  prevStep() {
    const {step} = this.state
    this.setState({
      step: step - 1
    })
  }

  handleChange = (input) => e => {
    this.setState({
      [input]: e.target.value
    })
  }


  render() { 
    const { step, firstName, email, DOB, gender, age, password } = this.state
    // eslint-disable-next-line default-case
    switch(step){
      case 1: 
        return(
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
        )
      case 2: 
        return(
          <Location
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
          />
        )
      case 3: 
        return(
          <Preferences
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
          />
        )
      case 4: 
        return(
          <Assets
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
          />
        )
      case 5: 
        return(
          <Terms
            prevStep={this.prevStep}
            handleChange={this.handleChange}
          />
        )
    }
  }
}
export default SignUp;
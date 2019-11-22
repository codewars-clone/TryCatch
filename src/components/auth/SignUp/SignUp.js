import React, { Component } from 'react';


class SignUp extends Component {
  constructor() {
    super() 
    this.state = {
      step: 1,
      firstName: '',
      DOB: '',
      age: '',
      location: '',
      Gender: '',
      ageIntrest: '',
      meetUp: '',
      sexualOrientation: ''
    }
    this.nextStep = this.nextStep.bind(this)
    this.prevStep = this.nextStep.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  nextStep() {
    const {step} = this.step
    this.setState({
      step: step + 1
    })
  }

  prevStep() {
    const {step} = this.step
    this.setState({
      step: step + 1
    })
  }

  handleChange(input) {
    return function(e) {
      this.setState({
        [input]: e.target.value
      })
    }
  }

  render() { 
    return (  
      <div>THHIS IS SIGNUP</div>
    );
  }
}
export default SignUp;
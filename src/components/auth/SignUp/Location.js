import React, { Component } from 'react'

export default class Location extends Component {
  constructor() {
    super()
    this.continue = this.continue.bind(this)
  }

  continue(e) {
    e.preventDefault()
    this.props.nextStep()
  }

  render() {
    return (
      <div>
        THIS IS LOCATION
      </div>
    )
  }
}
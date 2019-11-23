import React, { Component } from 'react'

export default class Preferences extends Component {
  constructor() {
    super()
    this.continue = this.continue.bind(this)
    this.back = this.back.bind(this)
  }

  continue(e) {
    e.preventDefault()
    this.props.nextStep()
  }

  back(e) {
    e.preventDefault()
    this.props.prevStep()
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <h1 className="title">Preferences</h1>
          
          {/* BUTTONS */}
          <div className="buttons">
            <button className="button is-danger" onClick={this.back}>Back
            </button>
            <button className="button is-info" onClick={this.continue}>
              Save and continue
            </button>
          </div>
        </div>
      </section>
    )
  }
}
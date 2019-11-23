import React, { Component } from 'react'

export default class Terms extends Component {
  constructor() {
    super()
    this.back = this.back.bind(this)
  }

  back(e) {
    e.preventDefault()
    this.props.prevStep()
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <h1 className="title">Terms</h1>
          
          {/* BUTTONS */}
          <div className="buttons">
            <button className="button is-danger" onClick={this.back}>Back
            </button>
            <button className="button is-info">
              Submit
            </button>
          </div>
        </div>
      </section>
    )
  }
}
import React, { Component } from 'react'

export default class Messages extends Component {
  constructor() {
    super()
    this.state = { 
      messages: [{
        sender: 'Fred',
        time:'10:05pm, November 25th, 2019, Monday',
        text: "Hi, Daphane"
        },
        {
          sender: 'Daphane',
          time:'10:06pm, November 25th, 2019, Monday',
          text: "Hi, Fred"
        }
      ]
    }
  }
  render() {
    const { messages } = this.state
    return (
      <section className="section">
        <div className='container'>
          <ul>
            {messages.map(message => {
              return(<li key={message.sender}>
                <p>{message.sender}</p>
                <p>{message.time}</p>
                <p>{message.text}</p>
                <br/>
              </li>)
            })}
          </ul>
        </div>
      </section>

    )
  }
}

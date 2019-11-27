import React, { Component } from 'react';

export default class Messages extends Component {
  constructor() {
    super();
  }
  render() {
    const { messages } = this.props;
    return (
      <section className="section">
        <div className="container">
          <ul>
            {messages &&
              messages.map(message => {
                return (
                  <li key={message.sender}>
                    <p>{message.sender}</p>
                    <p>{message.time}</p>
                    <p>{message.text}</p>
                    <br />
                  </li>
                );
              })}
          </ul>
        </div>
      </section>
    );
  }
}

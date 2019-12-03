import React, { Component } from 'react';

export default class Messages extends Component {
  render() {
    const { messages } = this.props;
    return (
      <section className="section">
        <div className="container">
          <ul>
            {messages &&
              messages.map((message, index)=> {
                return (
                  <li key={index}>
                    <p>{message.name}</p>
                    <p>{message.time}</p>
                    <p>{message.txt}</p>
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

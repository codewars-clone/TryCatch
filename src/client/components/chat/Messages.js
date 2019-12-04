import React, { Component } from 'react';
import autoscroll from 'autoscroll-react';

class Messages extends Component {
  render() {
    const { messages } = this.props;
    return (
      <section className="section">
        <div className="container">
          <ul {...this.props}>
            {messages &&
              messages.map((message, index) => {
                return (
                  <li key={index}>
                    <div className="bubble">
                      <p>{message.name}</p>
                      <p>{message.time}</p>
                      <p>{message.txt}</p>
                    </div>
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
export default autoscroll(Messages);

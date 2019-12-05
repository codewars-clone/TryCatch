import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';


class Messages extends Component {
  render() {
    const { messages, user } = this.props; 
    return (
      <section className="section">
        <div className="container">
          <ul className='messages'>
            {messages &&
              messages.map((message, index) => {
                const bubbleColor = user.name === message.name ? "bubble-user": 'bubble'
                return (
                  <li key={index}>
                    <div className={bubbleColor}>
                      <p>{message.name}</p>
                      <p>{moment(message.time).fromNow()}</p>
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

const mapStateToProps = state => {
  return {
    user: state.firebase.profile,
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps, null)(Messages);

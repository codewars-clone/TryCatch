import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Messages } from '../index'

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
        <div className='container'>
          <div className="box">
            <div className="media">
              <div className="media-content">
                <figure className="image is-48x48">
                  <img className='is-rounded' width = '2100px' height='200px' src='https://statici.behindthevoiceactors.com/behindthevoiceactors/_img/chars/fred-jones-whats-new-scooby-doo-96.jpg' alt=""/>  
                </figure>
              </div>
              <div className="media-content">
                <h3 className="title is-3">Fred</h3>  
              </div>
              <div className="media-right">
                <Link to='/catch'>
                  <div  className="buttons">
                    <button className='button is-danger'>
                      LEAVE CHAT
                    </button>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <Messages />
          <form id='form'>
            <div className="field has-addons">
              <div className="control">
                <input type="text" name="message" className="input" placeholder="Send message" autoFocus />
              </div>
              <div className="button is-info">
                <button name="submit" className="login-button">Send</button>
              </div>
            </div>
          </form>
        </div>
    );
  }
}

export default ChatRoom;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Messages } from '../index'
import {connect} from 'react-redux'
import {getChat} from '../../store/reducers/chat'

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
componentDidMount (){
  let chatId = this.props.match.params.id
  this.props.getChat(chatId)
}
  render() { 
    const {currChat} = this.props
    console.log("TCL: ChatRoom -> render -> currChat", currChat)
    
    return ( 
        <div className='container'>
          <div className="box">
            <div className="media">
              <div className="media-content">
                <figure className="image is-48x48">
                  <img className='is-rounded' width = '2100px' height='200px' src={currChat.image} alt=""/>  
                </figure>
              </div>
              <div className="media-content">
                <h3 className="title is-3">{currChat.name}</h3>  
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

const mapStateToProps = state => {
  return { 
    currChat: state.chat.currChat
  }
}

const mapDispatchToProps = dispatch => {
  return { 
    getChat: (chatId)=> dispatch(getChat(chatId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (ChatRoom);
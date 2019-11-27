import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Messages } from '../index'
import {connect} from 'react-redux'
import {getChat} from '../../store/reducers/chat'
import LoadingScreen from 'react-loading-screen'
import TryImage from '../auth/try.png'

class ChatRoom extends Component {
  constructor(props) {
    super(props)
    this.state = {  
      loadingScreen: true
    }
  }
componentDidMount (){
  let chatId = this.props.match.params.id
  const { currChat } = this.props
  if(chatId && !currChat){
    setTimeout(() => {
      this.setState({
        loadingScreen: false
      })
          
    }, 2000)
  }
  this.props.getChat(chatId)
}
  render() { 
    const {currChat} = this.props
    const { loadingScreen } = this.state

    let image = currChat ? currChat.image : ''
    let name = currChat ? currChat.name : ''

    console.log("TCL: ChatRoom -> render -> currChat", currChat)
    
    let main = <div className='container'>
                  <div className="box">
                    <div className="media">
                      <div className="media-content">
                        <figure className="image is-48x48">
                          <img className='is-rounded' width = '2100px' height='200px' src={image} alt=""/>  
                        </figure>
                      </div>
                      <div className="media-content">
                        <h3 className="title is-3">{name}</h3>  
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

      return ( 
        <div>
        {main}
              <LoadingScreen 
          loading={loadingScreen} 
          bgColor='#f1f1f1'
          spinnerColor='#9ee5f8'
          textColor='#676767'
          logoSrc={TryImage}
          text='Please wait, finding  Catches'
          />
        </div>
      )
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
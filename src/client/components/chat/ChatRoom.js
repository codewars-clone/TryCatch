import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Messages } from '../index';
import { connect } from 'react-redux';
import {
  getChat,
  addMessage,
  addMessageThunk,
  messageListener,
  getChatsThunk,
} from '../../store/reducers/chat';
import { db } from '../../store';
import back from './ButtonBack.png';
import * as Scroll from 'react-scroll';


let scroll = Scroll.animateScroll;


class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingScreen: true,
      txt: '',
      messages: [],
      people: [],
      disabled: true
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  componentDidMount() {
    let chatId = this.props.match.params.id;

    if (chatId) {
      setTimeout(() => {
        this.setState({
          loadingScreen: false,
        });
      }, 1200);
    }

    db.collection('chats')
      .doc(chatId)
      .onSnapshot(doc => {
        this.setState({
          people: doc.data().people,
          messages: doc.data().messages,
        });
      });

    this.props.getChat(chatId);
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  handleInput(ev) {
    if(ev.target.value){
      this.setState({
        disabled: false
      })
    }
    else{
      this.setState({
        disabled: true
      })
    }
    this.setState({
      txt: ev.target.value,
    });
  }

  scrollToBottom() {
    scroll.scrollToBottom({
      containerClass: 'container',
    });
  }

  handleSubmit(ev) {
    ev.preventDefault();
    let txt = this.state.txt;
    let message = {
      chatId: this.props.match.params.id,
      name: this.props.user.name,
      time: Date(Date.now()),
      txt,
    };

    this.props.addMessageThunk(message);

    this.setState({
      txt: ''
    })

  }

  render() {
    const { messages, people } = this.state;
    let image = '';
    let name = '';

    if (people) {
      people.forEach(person => {
        if (person.id !== this.props.auth.uid) {
          name = person.name;
          image = person.image;
        }
      });
    }
    
    return (
      <div className="container" onChange={() => this.scrollToBottom()}>
        <div className="box" id='box-header'>
          <div className="media">
            <div className="media-left">
              <Link to="/catch">
                <div className="buttons">
                  <img src={back} alt="" />
                </div>
              </Link>
            </div>
            <div className="media-left">
              <figure className="image is-48x48">
                <img
                  className="is-rounded"
                  width="2100px"
                  height="200px"
                  src={image}
                  alt=""
                />
              </figure>
            </div>
            <div className="media-right">
              <h3 className="title is-3">{name}</h3>
            </div>
          </div>
        </div>
        <Messages messages={messages} />
        <form onSubmit={this.handleSubmit} id="form">
          <div className="field has-addons">
            <div className="control">
              <input
                type="text"
                name="message"
                className="input"
                placeholder="Send message"
                autoFocus
                value={this.state.txt}
                onChange={this.handleInput}
              />
            </div>
            <div className="button is-info">
              <button
                name="submit"
                disabled={this.state.disabled}
                onClick={() => this.scrollToBottom()}
                className="login-button"
              >
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currChat: state.chat.currChat,
    chats: state.chat.chats,
    user: state.firebase.profile,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getChat: chatId => dispatch(getChat(chatId)),
    getChatsThunk: () => dispatch(getChatsThunk()),
    addMessage: message => dispatch(addMessage(message)),
    messageListener: chatId => dispatch(messageListener(chatId)),
    addMessageThunk: message => dispatch(addMessageThunk(message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);

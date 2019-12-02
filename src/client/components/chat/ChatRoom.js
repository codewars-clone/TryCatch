import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Messages } from '../index';
import { connect } from 'react-redux';
import { getChat, addMessage, addMessageThunk, messageListener} from '../../store/reducers/chat';
import LoadingScreen from 'react-loading-screen';
import TryImage from '../auth/try.png';
import moment from 'moment';

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    //console.log('name => ', props);
    this.state = {
      loadingScreen: true,
      txt: '',
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    let chatId = this.props.match.params.id;
    //console.log(chatId);
    const { currChat } = this.props;
    if (chatId) {
      setTimeout(() => {
        this.setState({
          loadingScreen: false,
        });
      }, 2000);
    }
    this.props.messageListener(chatId)
    this.props.getChat(chatId);
  }
  handleInput(ev) {
    this.setState({
      txt: ev.target.value,
    });
  }
  handleSubmit(e) {
    //console.log('event => ', e);
    e.preventDefault();
    let txt = this.state.txt;
    let message = {
      chatId: this.props.currChat[0].chatId,
      name: 'Daphyni',
      time: moment().format('MMMM Do YYYY, h:mm:ss a'),
      txt,
    }; 
    
    this.props.addMessageThunk(message)
  }

  render() {
    const { currChat } = this.props;

    const { loadingScreen } = this.state;

    let image = currChat.length ? currChat[0].image : '';
    let name = currChat.length ? currChat[0].name : '';
    let messages = currChat.length ? currChat[0].messages : [];

  console.log('TCL: ChatRoom -> render -> currChat ', currChat);
    let main = (
      <div className="container">
        <div className="box">
          <div className="media">
            <div className="media-content">
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
            <div className="media-content">
              <h3 className="title is-3">{name}</h3>
            </div>
            <div className="media-right">
              <Link to="/catch">
                <div className="buttons">
                  <button className="button is-danger">LEAVE CHAT</button>
                </div>
              </Link>
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
                onChange={this.handleInput}
              />
            </div>
            <div className="button is-info">
              <button name="submit" className="login-button">
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    );

    return (
      <div>
        {main}
        <LoadingScreen
          loading={loadingScreen}
          bgColor="#f1f1f1"
          spinnerColor="#9ee5f8"
          textColor="#676767"
          logoSrc={TryImage}
          text="Please wait, finding  Catches"
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currChat: state.chat.currChat,
    chats: state.chat.chats,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getChat: chatId => dispatch(getChat(chatId)),
    addMessage: message => dispatch(addMessage(message)),
    messageListener: chatId => dispatch(messageListener(chatId)),
    addMessageThunk: message => dispatch(addMessageThunk(message))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);

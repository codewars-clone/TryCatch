import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SingleAwait } from '../../index';
import { createChat, createChatThunk } from '../../../store/reducers/chat';
import { getLikes, sendLike } from '../../../store/reducers/likes';
import { getUser } from '../../../store/reducers/users';

class AwaitList extends Component {
  constructor() {
    super();
    this.createChat = this.createChat.bind(this);
  }
  async componentDidMount() {
    const userId = this.props.auth.uid;
    this.props.getCurrentUser(userId);
    this.props.getLikes(userId);
  }

  createChat(prospect) {
    let newChat = {
      chatId: prospect.userId,
      name: prospect.name,
      people: {
        prospect: {
          name: prospect.name,
        },
        user: {
          name: this.props.user.name,
        },
      },
      image: prospect.imageUrl,
      messages: []
    };
    console.log('TCL: AwaitList -> createChat -> newChat ', newChat);
    this.props.createChatThunk(newChat);
  }

  render() {
    console.log('prospects in DB', this.props.prospects);
    // const prospects = [ {
    //   userId: "1",
    //   name: "Johnny",
    //   age: 24,
    //   gemder: 'male',
    //   image:  "https://pbs.twimg.com/profile_images/1005956021087547393/RdD7s-Gb_400x400.jpg"
    // },{
    //   userId: "2",
    //   name: "Freddy",
    //   age: 24,
    //   gemder: 'male',
    //   image: "https://cdn.images.express.co.uk/img/dynamic/35/590x/Freddie-Mercury-final-pictures-1208447.jpg?r=1574537671789"
    // }]
    console.log('CHAT', this.props.chats);
    if (this.props.prospects.length) {
      const prospects = this.props.prospects;
      return (
        <section className="section">
          <div className="container">
            <h1 className="title is-1">Await</h1>
            <hr />
            {prospects.map(prospect => {
              return (
                <SingleAwait
                  key={prospect.userId}
                  prospect={prospect}
                  createChat={this.createChat}
                  sendLike={this.props.sendLike}
                />
              );
            })}
          </div>
        </section>
      );
    } else {
      return <div></div>;
    }
  }
}

const mapStateToProps = state => {
  return {
    chats: state.chat.chats,
    prospects: state.likes.likes,
    user: state.users.user,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createChatThunk: newChat => dispatch(createChatThunk(newChat)),
    createChatRoom: newChat => dispatch(createChat(newChat)),
    getLikes: userId => dispatch(getLikes(userId)),
    sendLike: userId => dispatch(sendLike(userId)),
    getCurrentUser: userId => dispatch(getUser(userId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AwaitList);

import React, { Component } from 'react'
import { SingleCatch } from '../../index'
import { connect } from 'react-redux'
import { getChatsThunk } from '../../../store/reducers/chat'

class AllCatch extends Component {

  componentDidMount() {
    this.props.getChatsThunk()
  }

  render() {
    const { chats } = this.props
    // console.log("TCL: AllCatch -> render -> chats ", chats )

    // const list = []
    // const filteredChats = chats.filter( chat => {
    //   if(chat.people[0].id === this.props.auth.uid || chat.people[1].id === this.props.auth.uid ){
    //     return chat
    //   }
    // })
    // console.log("TCL: AllCatch -> render -> filteredChats ", filteredChats )

    // filteredChats.forEach(chat => {
    //   chat.people.forEach(person => {
    //     if(person.id !== this.props.auth.uid){
    //       const updatedChat = {
    //         chatId: chat.chatId,
    //         name: person.name,
    //         image: person.image
    //       }
    //       list.push(updatedChat)
    //     }
    //   })
    // })

    return (
      <section className="section">
        <div className="container catch-padding">
          <h1 className="title is-1">Catch</h1>
          <hr/>
          { chats.map(chat => {
            return( <SingleCatch key={chat.chatId} chat={chat}/>)
          })}
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    chats: state.chat.chats,
    user: state.firebase.profile,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getChatsThunk: () => { dispatch(getChatsThunk()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCatch)

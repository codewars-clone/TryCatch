import React, { Component } from 'react'
import { SingleCatch } from '../../index'
import { connect } from 'react-redux'
import { getChatsThunk } from '../../../store/reducers/chat'

class AllCatch extends Component {

  componentDidMount() {
    console.log('ID', this.props.user.uid)
    this.props.getChatsThunk()
  }

  render() { 
    const { chats } = this.props

    const list = []
    chats.forEach( chat => {
      chat.people.forEach(person => { 
        if(person.id !== this.props.user.uid){
          const updatedChat = {
            chatId: chat.chatId,
            name: person.name,
            image: person.iamge
          }
          list.push(updatedChat)
        }
      })
    })

    return (  
      <section className="section">
        <div className="container">
          <h1 className="title is-1">Catch</h1>
          <hr/>
          { list.map(chat => {
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
    user: state.firebase.profile
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getChatsThunk: (user) => { dispatch(getChatsThunk(user)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCatch)
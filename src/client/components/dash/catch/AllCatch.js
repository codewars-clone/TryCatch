import React, { Component } from 'react'
import { SingleCatch } from '../../index'
import { connect } from 'react-redux'
import { Stats } from 'fs';
class AllCatch extends Component {

  render() { 
    const { chats } = this.props
    console.log("TCL: AllCatch -> render -> hats", this.props)
    return (  
      <section className="section">
        <div className="container">
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
    chats: state.chat.chats
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCatch)
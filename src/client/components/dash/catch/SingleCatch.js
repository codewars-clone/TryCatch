import React from 'react'
import { ChatButton } from '../../index'
import { Link } from 'react-router-dom'
const SingleCatch = props => {
  const { chat } = props

  return ( 
    <div className="box">
      <div className="media">
          <div className="media-left">
            <figure className="image is-96x96">
              <img className='is-rounded' src={chat.image} alt="profile"/>   
            </figure>
          </div>
          <div className="media-content">
            <h4 className="title is-4">{chat.name}</h4>  
          </div>
          <div className="media-right">
          <div id={chat.chatId}>
            <Link to={`/chat/${chat.chatId}`}>
              <ChatButton />
            </Link>
          </div>
        </div>
      </div>
  </div>
  );
}

export default SingleCatch;
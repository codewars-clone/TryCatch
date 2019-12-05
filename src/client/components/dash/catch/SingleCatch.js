import React from 'react'
import { ChatButton } from '../../index'
import { Link } from 'react-router-dom'
const SingleCatch = props => {
  const { chat } = props

  return ( 
    <div className="box">
      <div className="media">
          <div className="media-content">
            <figure className="image is-96x96">
              <img src={chat.image} alt="profile"/>   
            </figure>
          </div>
          <Link to={`/chat/${chat.chatId}`}>
            <div className="media-content">
              <h4 className="title is-4">{chat.name} <i className="far fa-comment"></i></h4>  
            </div>
          </Link>
      </div>
  </div>
  );
}

export default SingleCatch;
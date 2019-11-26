import React from 'react'
import { ChatButton } from '../../index'
import { Link } from 'react-router-dom'
const SingleCatch = () => {
  return ( 
    <div className="box">
    <div className="media">
      <div className="media-content">
        <figure className="image is-96x96">
          <img width = '2100px' height='200px' src='' alt=""/>   
        </figure>
      </div>
      <div className="media-right">
        <h4 className="title is-4"> 23 <i class="fas fa-birthday-cake"></i></h4> 
        <Link to='/try'>
          <ChatButton />
        </Link>
      </div>
    </div>
  </div>
  );
}

export default SingleCatch;
import React from 'react'
import { ChatButton } from '../../index'
import { Link } from 'react-router-dom'
const SingleCatch = () => {
  return ( 
    <div className="box">
    <div className="media">
      <div className="media-content">
        <figure className="image is-96x96">
          <img width = '2100px' height='200px' src='https://statici.behindthevoiceactors.com/behindthevoiceactors/_img/chars/fred-jones-whats-new-scooby-doo-96.jpg' alt=""/>   
        </figure>
      </div>
      <div className="media-content">
        <h3 className="title is-3">Fred</h3>  
      </div>
      <div className="media-right">
        <Link to='/try'>
          <ChatButton />
        </Link>
      </div>
    </div>
  </div>
  );
}

export default SingleCatch;
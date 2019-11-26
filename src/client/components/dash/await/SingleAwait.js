import React, { Component } from 'react';
import { LikeButton } from '../../index'
import{ Link } from 'react-router-dom'
class SingleAwait extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() {
    const { age, image } = this.props.prospect
    const { createChat, prospect } = this.props

    return ( 
      <div className="box">
        <div className="media">
          <div className="media-content">
            <figure className="image is-96x96">
              <img width = '2100px' height='200px' src={image} alt=""/>   
            </figure>
          </div>
          <div className="media-right">
            <h4 className="title is-4" >{age} <i class="fas fa-birthday-cake"></i></h4> 
            <div onClick={()=> {createChat(prospect)}}>
              <Link to='/splash'>
                <LikeButton />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleAwait;
import React, { Component } from 'react';
import { LikeButton } from '../../index'
import  NextButton from '../NextButton';
class SingleAwait extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() {
    const { name, age, imageUrl, userId } = this.props.prospect
    const { createChat, prospect } = this.props

    return (
      <div className="box">
        <div className="media">
          <div className="media-content">
            <figure className="image is-64x64">
              <img  src={imageUrl} alt="profile"/>
            </figure>
            <div class="media-left" onClick={() => this.props.unLike(userId)}>
              <div className="buttons">
                <button className="button is-danger">
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="media-right">
            <h4 className="title is-4" >{name} {age} <i className="fas fa-birthday-cake"></i></h4>
            <div onClick={()=> {createChat(prospect)}}>
                <div onClick={() => this.props.sendLike(userId)}>
                <LikeButton />
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleAwait;

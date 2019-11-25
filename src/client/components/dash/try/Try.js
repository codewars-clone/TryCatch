import React, { Component } from 'react';
import { LikeButton } from '../../index'
//import { connect } from 'react-redux'
import axios from 'axios';
//display photo, name, age... description later
//how to randomize which user is displayed, based on preferences
//needs two buttons, like button and x button

//in order to get all users that match preferences, we send a specific request that takes the current users' preferences, and makes a call to the database using those preferences as filters, and specificially if that user has not been "seen" by the current user. Can return all users that match these preferences, and that becomes the stack? or a user is randomly selected from that list.
//also, the other user's preferences have to match the requested user's info/assets
const user = {
  age: 26,
  name: "Daphne",
  imageUrl: "https://upload.wikimedia.org/wikipedia/it/4/41/Daphne_Blake.jpg",
  codingChallenge: 'find the sum in a multidimensional array'
}
export default class Try extends Component {
  constructor(){
    super();
    this.state = {
      user: user,
      //currentIdx: 0
    };
   // this.handleClick = this.handleClick.bind(this);
  };
  async componentDidMount(){
    // const response = await axios.get(`server/users/QiJLYhalcagEnxHjF5cb`);
    // const user = response.data;
    // this.setState({user: user});
    // console.log(this.state.user)
  }
  handleX(){
    // this.setState({currentIdx:+1})
    //will make a dispatch to store to handle X
  }
  handleLike(){
    //will make a dispatch to store to handle like
  }
  render() {
    return (
      <section className="section">
        <div className='container'>
          <h1 className="title is-1">Try</h1>
          <hr />
          <h2 className="title is-3"><b>{this.state.user.name}</b></h2>
          <figure className='image is-square'>
            <img width = '2100px' height='200px' src={this.state.user.imageUrl} alt=""/>   
            <LikeButton />
          </figure>
          <br/>
          <div className="box">
            <div className="media">
              <div className="media-content">
                <i class="fas fa-birthday-cake"></i>
                <h6 className="title is-6"> {this.state.user.age}</h6>
              </div>
              <div className="media-content">
                <i class="fab fa-js-square"></i>
                <h6 className="title is-6">Javascript</h6>
              </div>
              <div className="media-content">
                <i class="fas fa-location-arrow"></i>
                <h6 className="title is-6">New York, NY</h6>
              </div>
              <div className="media-content">
                <i class="fas fa-ruler-vertical"></i>
                <h6 className="title is-6">5'8</h6>
              </div>
            </div>
          </div>
          <br/>
          <div className="content">
            <h3 className="title is-3">Coding Challenge</h3>
            <p>{this.state.user.codingChallenge}</p>
            <textarea placeHolder='write code here and hit like button' cols="30" rows="10" className="textarea"></textarea>
            <LikeButton />
          </div>
          {/* PIC 2 */}
          <figure className='image is-square'>
            <img width = '2100px' height='200px' src='https://vignette.wikia.nocookie.net/scoobydoo/images/1/1d/Daphne_Blake.png/revision/latest?cb=20190320032736' alt=""/>   
            <LikeButton />
          </figure>
          <br/>
          <div className="content">
            <h3 className="title is-3">Puns</h3>
            <h4 className="subtitle">lorem lor e leolda </h4>
            <LikeButton />
          </div>
          {/* PIC 3 */}
          <figure className='image is-square'>
            <img width = '2100px' height='200px' src='https://www.sdpnoticias.com/files/image_804_455/uploads/2019/08/06/5d4974b3cac78.jpeg' alt=""/>   
            <LikeButton />
          </figure>
          <br/>
          <div className="content">
            <h3 className="title is-3">Puns</h3>
            <h4 className="subtitle">lorem lor e leolda </h4>
            <LikeButton />
          </div>
        </div>
      </section>

    );
  }
}

// const mapStateToProps = (state) => ({

// })

// const mapDispatchToProps = {

// }

// export default connect(mapStateToProps, mapDispatchToProps)(Try)



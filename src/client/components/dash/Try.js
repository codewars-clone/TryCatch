import React, { Component } from 'react';
//import { connect } from 'react-redux'
import axios from 'axios';
//display photo, name, age... description later
//how to randomize which user is displayed, based on preferences
//needs two buttons, like button and x button

//in order to get all users that match preferences, we send a specific request that takes the current users' preferences, and makes a call to the database using those preferences as filters, and specificially if that user has not been "seen" by the current user. Can return all users that match these preferences, and that becomes the stack? or a user is randomly selected from that list.
//also, the other user's preferences have to match the requested user's info/assets
export default class Try extends Component {
  constructor(){
    super();
    this.state = {
      user: {},
      currentIdx: 0
    };
   // this.handleClick = this.handleClick.bind(this);
  };
  async componentDidMount(){
    const response = await axios.get(`server/users/QiJLYhalcagEnxHjF5cb`);
    const user = response.data;
    this.setState({user});
    console.log(this.state.user)
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
      <div>
        <img src ={this.state.user.imageUrl} />
        <button onClick= {this.handleLike}></button>
        <h4>{this.state.user.name} {this.state.user.age}</h4>
        <button onClick= {this.handleX}>X</button>
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({

// })

// const mapDispatchToProps = {

// }

// export default connect(mapStateToProps, mapDispatchToProps)(Try)



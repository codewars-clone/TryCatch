import React, { Component } from 'react';
import { LikeButton, NextButton, Splash } from '../../index';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUsers, getUser } from '../../../store/reducers/users';
import { getProspects } from '../../../store/reducers/likes';
//display photo, name, age... description later
//how to randomize which user is displayed, based on preferences
//needs two buttons, like button and x button

//in order to get all users that match preferences, we send a specific request that takes the current users' preferences, and makes a call to the database using those preferences as filters, and specificially if that user has not been "seen" by the current user. Can return all users that match these preferences, and that becomes the stack? or a user is randomly selected from that list.
//also, the other user's preferences have to match the requested user's info/assets
const user = {
  age: 26,
  name: 'Daphne',
  imageUrl: 'https://upload.wikimedia.org/wikipedia/it/4/41/Daphne_Blake.jpg',
  codingChallenge: 'find the sum in a multidimensional array',
};
class Try extends Component {
  constructor() {
    super();
    this.state = {
      user: user,
      redirect: false,
      //currentIdx: 0
    };
    this.renderSplash = this.renderSplash.bind(this);
  }
  componentDidMount() {
    console.log('>>>>>>', this.props.auth);
    this.props.getUserData();
    const userId = this.props.auth;
    this.props.getCurrentUser(userId);
    this.props.getProspects(userId);

    // const user = response.data;
    // this.setState({user: user});
    // console.log(this.state.user)
  }
  handleX() {
    // this.setState({currentIdx:+1})
    //will make a dispatch to store to handle X
  }
  handleLike() {
    //will make a dispatch to store to handle like
  }

  renderSplash() {
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      console.log(redirect);
      return <Redirect to="/splash" />;
    } else {
      return (
        <section className="section">
          <div className="container">
            <h1 className="title is-1">Try</h1>
            <hr />
            <h2 className="title is-3">
              <b>{this.state.user.name}</b>
            </h2>
            <figure className="image is-square">
              <img
                width="2100px"
                height="200px"
                src={this.state.user.imageUrl}
                alt=""
              />
              <LikeButton renderSplash={this.renderSplash} />
            </figure>
            <br />
            <div className="box">
              <div className="media">
                <div className="media-content">
                  <i className="fas fa-birthday-cake"></i>
                  <h6 className="title is-6"> {this.state.user.age}</h6>
                </div>
                <div className="media-content">
                  <i className="fab fa-js-square"></i>
                  <h6 className="title is-6">Javascript</h6>
                </div>
                <div className="media-content">
                  <i className="fas fa-location-arrow"></i>
                  <h6 className="title is-6">New York, NY</h6>
                </div>
                <div className="media-content">
                  <i className="fas fa-ruler-vertical"></i>
                  <h6 className="title is-6">5'8</h6>
                </div>
              </div>
            </div>
            <br />
            <div className="content">
              <h3 className="title is-3">Coding Challenge</h3>
              <p>{this.state.user.codingChallenge}</p>
              <textarea
                placeholder="write code here and hit like button"
                cols="30"
                rows="10"
                className="textarea"
              ></textarea>
              <LikeButton />
            </div>
            {/* PIC 2 */}
            <figure className="image is-square">
              <img
                width="2100px"
                height="200px"
                src="https://vignette.wikia.nocookie.net/scoobydoo/images/1/1d/Daphne_Blake.png/revision/latest?cb=20190320032736"
                alt=""
              />
              <LikeButton />
            </figure>
            <br />
            <div className="content">
              <h3 className="title is-3">Puns</h3>
              <h4 className="subtitle">lorem lor e leolda </h4>
              <LikeButton />
            </div>
            {/* PIC 3 */}
            <figure className="image is-square">
              <img
                width="2100px"
                height="200px"
                src="https://www.sdpnoticias.com/files/image_804_455/uploads/2019/08/06/5d4974b3cac78.jpeg"
                alt=""
              />
              <LikeButton />
            </figure>
            <br />
            <div className="content">
              <h3 className="title is-3">Puns</h3>
              <h4 className="subtitle">lorem lor e leolda </h4>
              <LikeButton />
            </div>
            <NextButton />
          </div>
        </section>
      );
    }
  }
}

const mapStateToProps = state => ({
  reduxAuth: state.auth,
  auth: state.firebase.auth,
  users: state.users.users,
  user: state.users.user,
});

const mapDispatchToProps = dispatch => ({
  getUserData: () => dispatch(getUsers()),
  getCurrentUser: userId => dispatch(getUser(userId)),
  getProspects: userId => dispatch(getProspects(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Try);

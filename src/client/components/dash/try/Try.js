import React, { Component } from 'react';
import { LikeButton, NextButton } from '../../index';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUsers, getUser } from '../../../store/reducers/users';
import {
  getProspects,
  getLikes,
  sendUnlike,
  sendLike,
} from '../../../store/reducers/likes';
import LoadingScreen from 'react-loading-screen';
import icon from './apple-touch-icon.png';

class Try extends Component {
  constructor() {
    super();
    this.state = {
      //user: user,
      redirect: false,
      message: '',
      loadingScreen: true,
    };
    this.renderSplash = this.renderSplash.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    const userId = this.props.auth.uid;
    this.props.getProspects(userId);
    this.props.getLikes(userId);
    let startPos;
    const geoSuccess = position => {
      startPos = position;
      console.log('LOCATION:', position);
      this.setState({
        loadingScreen: false,
      });
    };

    const geoError = error => {
      console.log('Error occurred. Error code: ' + error.code);
      setTimeout(() => {
        this.setState({
          loadingScreen: false,
        });
      }, 1500);
    };

    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  async handleCodingChallenge(prospectId, message) {
    await this.props.sendLike(prospectId, message);
    this.setState({ message: '' });
  }

  renderSplash() {
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { loadingScreen } = this.state;
    if (!this.props.prospects[0]) {
      return (
        <div>
          <LoadingScreen
            loading={loadingScreen}
            bgColor="#f1f1f1"
            spinnerColor="#9ee5f8"
            textColor="#676767"
            logoSrc={icon}
            text="Please wait, loading prospects."
          />
          <section className="section">
            <div className="container">
              <h1 className="title is-1">Try</h1>
              <hr />
              <h3 className="title is-3"> No prospects in your area :(</h3>
            </div>
          </section>
        </div>
      );
    } else {
      const prospect = this.props.prospects[0];
      const { loadingScreen } = this.state;
      return (
        <div>
          <LoadingScreen
            loading={loadingScreen}
            bgColor="#f1f1f1"
            spinnerColor="#9ee5f8"
            textColor="#676767"
            logoSrc={icon}
            text="Please wait, loading prospects."
          />
          <section className="section">
            <div className="container">
              <h1 className="title is-1">Try</h1>
              <hr />
              <h2 className="title is-2">
                <b>{prospect.name}</b>
              </h2>
              <figure className="image is-square">
                <img
                  width="2100px"
                  height="200px"
                  src={prospect.imageUrl}
                  alt=""
                />
                <div onClick={() => this.props.sendLike(prospect.userId)}>
                  <LikeButton renderSplash={this.renderSplash} />
                </div>
              </figure>
              <br />
              <div className="box">
                <div className="media">
                  <div className="media-content">
                    <i className="fas fa-birthday-cake"></i>
                    <h6 className="title is-6"> {prospect.age}</h6>
                  </div>
                  {prospect.favoriteLang ? (
                    <div className="media-content">
                      <i className="fab fa-js-square"></i>
                      <h6 className="title is-6">{prospect.favoriteLang}</h6>
                    </div>
                  ) : null}
                  <div className="media-content">
                    <i className="fas fa-location-arrow"></i>
                    <h6 className="title is-6">New York, NY</h6>
                  </div>
                  {prospect.height ? (
                    <div className="media-content">
                      <i className="fas fa-ruler-vertical"></i>
                      <h6 className="title is-6">{prospect.height}</h6>{' '}
                    </div>
                  ) : null}
                </div>
              </div>
              <br />
              {prospect.codeChallenge ? (
                <div className="content">
                  <h4 className="title is-4">Coding Challenge</h4>
                  <p>{prospect.codeChallenge}</p>
                  <textarea
                    placeholder="write code here and hit like button"
                    type="message"
                    name="message"
                    cols="30"
                    rows="10"
                    className="textarea"
                    onChange={this.handleChange}
                  ></textarea>
                  <div
                    onClick={() =>
                      this.handleCodingChallenge(
                        prospect.userId,
                        this.state.message
                      )
                    }
                  >
                  <div className="buttons is-right">
                      <button className="button is-success">
                        <i class="fab fa-telegram-plane"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
              <div
                onClick={() => {
                  this.props.sendUnlike(prospect.userId);
                }}
              >
                <NextButton />
              </div>
            </div>
          </section>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  users: state.users.users,
  user: state.users.user,
  prospects: state.likes.prospects,
});

const mapDispatchToProps = dispatch => ({
  getUserData: () => dispatch(getUsers()),
  getCurrentUser: userId => dispatch(getUser(userId)),
  getProspects: userId => dispatch(getProspects(userId)),
  sendUnlike: prospectId => dispatch(sendUnlike(prospectId)),
  getLikes: userId => dispatch(getLikes(userId)),
  sendLike: (prospectId, message) => dispatch(sendLike(prospectId, message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Try);

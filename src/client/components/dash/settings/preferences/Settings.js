import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../../../store/reducers/auth';

class Settings extends Component {
  render() {
    return (
      <section className="section">
        <div className="container">
          <h1 className="title is-1">Settings</h1>
          <hr />
          <h3>Weclome, {this.props.user.name}</h3>
          <hr />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus in ipsum tempora provident alias vero, optio nihil
            iure, molestiae accusantium omnis incidunt tenetur officia
            blanditiis veritatis ea? Eius, necessitatibus ipsa?
          </p>
        </div>

        <button
          className="button is-danger is-light"
          onClick={() => this.props.logOut()}
        >
          Log Out
        </button>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  user: state.firebase.profile,
});

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

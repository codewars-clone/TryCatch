import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  SignUp,
  Dashbar,
  Try,
  AwaitList,
  AllCatach,
  Settings,
  Splash,
  ChatRoom,
  SignIn,
} from './client/components/index';
import { Route, Switch } from 'react-router-dom';
import { verifyAuth } from './client/store/reducers/auth';

class App extends Component {
  render() {
    console.log('ARE WE LOGGED IN YET? ', this.props.isLoggedIn);
    console.log('ARE WE LOGGED IN YET WITH FIREBASE? ', this.props.fbLoggedIn);
    const { isLoggedIn, isLoggedOut } = this.props;
    return (
      <div className="App">
        {isLoggedOut ? (
          <div>
            <Route path="/signUp" component={SignUp} />
            <Route
              exact
              path="/"
              render={() => (
                <div>
                  <SignIn />{' '}
                  <div id="filler" style={{ backgroundColor: '#2f323b' }} />
                </div>
              )}
            />
          </div>
        ) : (
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <div>
                  <Try /> <Dashbar />
                </div>
              )}
            />
            <Route
              path="/try"
              render={() => (
                <div>
                  <Try /> <Dashbar />
                </div>
              )}
            />{' '}
            />
            <Route
              path="/await"
              render={() => (
                <div>
                  <AwaitList /> <Dashbar />
                </div>
              )}
            />{' '}
            />
            <Route
              path="/catch"
              render={() => (
                <div>
                  <AllCatach /> <Dashbar />
                </div>
              )}
            />{' '}
            />
            <Route
              path="/settings"
              render={() => (
                <div>
                  <Settings /> <Dashbar />
                </div>
              )}
            />{' '}
            />
            <Route
              path="/splash"
              render={() => (
                <div>
                  <Splash /> <Dashbar />
                </div>
              )}
            />{' '}
            />
            <Route path="/chat/:id" component={ChatRoom} />
          </Switch>
        )}
      </div>
    );
  }
}
const mapState = state => {
  return {
    isLoggedIn: state.firebase.auth.isLoaded,
    isLoggedOut: state.firebase.auth.isEmpty,
  };
};

const mapDispatch = dispatch => {
  return {
    isVerified: () => dispatch(verifyAuth()),
  };
};

export default connect(mapState, mapDispatch)(App);

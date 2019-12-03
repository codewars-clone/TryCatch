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
  componentDidMount() {
    this.props.isVerified();
  }

  render() {
    console.log('ARE WE LOGGED IN YET? ', this.props.isLoggedIn);
    console.log('ARE WE LOGGED IN YET WITH FIREBASE? ', this.props.fbLoggedIn);
    const { isLoggedIn } = this.props;
    return (
      <div className="App">
        <Switch>
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
          />{' '}
          />
          {isLoggedIn && (
            <Switch>
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
        </Switch>
      </div>
    );
  }
}
const mapState = state => {
  return {
    isLoggedIn: state.auth.isAuthenticated,
    fbLoggedIn: state.firebase.auth.isAuthenticated,
  };
};

const mapDispatch = dispatch => {
  return {
    isVerified: () => dispatch(verifyAuth()),
  };
};

export default connect(mapState, mapDispatch)(App);

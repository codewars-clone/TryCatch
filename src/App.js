import React, { Component } from 'react';
import {
  SignUp,
  Dashbar,
  NextButton,
  Try,
  AwaitList,
  AllCatach,
  Settings,
  Splash,
  ChatRoom,
  SignIn,
} from './client/components/index';
import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/signUp" component={SignUp} />
        <Route path="/try" component={Try} />
        <Route path="/signin" component={SignIn} />
        <Route path="/await" component={AwaitList} />
        <Route path="/catch" component={AllCatach} />
        <Route path="/settings" component={Settings} />
        <Route path="/splash" component={Splash} />
        <Route path="/chat" component={ChatRoom} />
        <Dashbar />
      </div>
    );
  }
}

export default App;

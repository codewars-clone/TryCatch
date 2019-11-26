import React from 'react';
import { SignUp, Dashbar, Try, AwaitList, AllCatach, Settings, Splash, ChatRoom} from './client/components/index';
import { Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Route path="/signUp" component={SignUp} />
      <Route path="/try" component={Try} />
      <Route path="/await" component={AwaitList} />
      <Route path="/catch" component={AllCatach} />
      <Route path="/settings" component={Settings} />
      <Route path='/splash' component={Splash} />
      <Route path='/chat' component={ChatRoom} />
      <Dashbar />
    </div>
  );
}

export default App;

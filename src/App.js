import React from 'react';
import { SignUp, Dashbar, NextButton, Try, AwaitList, AllCatach, Settings} from './client/components/index';
import { Route } from 'react-router-dom';
<<<<<<< HEAD
import { Try } from './client/components/index';
import { SignIn } from './client/components/index';
=======

>>>>>>> master

function App() {
  return (
    <div className="App">
      <Route path="/signUp" component={SignUp} />
      <Route path="/try" component={Try} />
<<<<<<< HEAD
      <Route path="/signin" component={SignIn} />
=======
      <Route path="/await" component={AwaitList} />
      <Route path="/catch" component={AllCatach} />
      <Route path="/settings" component={Settings} />
      <Dashbar />
      {/* <NextButton /> */}
>>>>>>> master
    </div>
  );
}

export default App;

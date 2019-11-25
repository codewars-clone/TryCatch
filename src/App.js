import React from 'react';
import { SignUp, Dashbar, NextButton, Try, AwaitList, AllCatach} from './client/components/index';
import { Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Route path="/signUp" component={SignUp} />
      <Route path="/try" component={Try} />
      <Route path="/await" component={AwaitList} />
      <Route path="/catch" component={AllCatach} />
      <Route path="/settings" component={Try} />
      <Dashbar />
      <NextButton />
    </div>
  );
}

export default App;

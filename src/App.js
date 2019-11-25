import React from 'react';
import { SignUp, Dashbar } from './client/components/index';
import { Route } from 'react-router-dom';
import { Try } from './client/components/index';

function App() {
  return (
    <div className="App">
      <Route path="/signUp" component={SignUp} />
      <Route path="/try" component={Try} />
      <Dashbar />
    </div>
  );
}

export default App;

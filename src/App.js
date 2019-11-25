import React from 'react';
import { SignUp } from './components';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Route path="/signUp" component={SignUp} />
    </div>
  );
}

export default App;

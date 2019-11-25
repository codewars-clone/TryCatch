import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// import { getFirebase, reactReduxFirebase } from 'react-redux-firebase';
// import { getFirestore, reduxFirestore } from 'redux-firestore';
import users from './users';
import signIn from './signIn';

const reducer = combineReducers({ users, signIn });
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
//export * from './user';

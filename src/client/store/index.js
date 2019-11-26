import {createStore, applyMiddleware} from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {getFirebase, reactReduxFirebase} from 'react-redux-firebase';
import {getFirestore, reduxFirestore} from 'redux-firestore';
import {composeWithDevTools} from 'redux-devtools-extension';

import firebase from '../config/firebaseConfig';
import rootReducer from './reducers/root';

const middleware = composeWithDevTools(
  applyMiddleware(
    thunkMiddleware.withExtraArgument({getFirebase, getFirestore}),
    createLogger({collapsed: true})
  ),
  reduxFirestore(firebase),
  reactReduxFirebase(firebase)
);

const store = createStore(rootReducer, middleware);

export default store;
//export * from './user';

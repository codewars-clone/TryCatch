import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { getFirebase, reactReduxFirebase } from 'react-redux-firebase';
import { getFirestore, reduxFirestore } from 'redux-firestore';
import { createLogger } from 'redux-logger';

import firebaseConfig from '../config/firebaseConfig';
import rootReducer from './reducers/root';

const middleware = composeWithDevTools(
  applyMiddleware(
    thunkMiddleware.withExtraArgument({ getFirebase, getFirestore }),
    createLogger({ collapsed: true })
  ),
  reduxFirestore(firebaseConfig),
  reactReduxFirebase(firebaseConfig, {
    useFirestoreForProfile: true,
    userProfile: 'users',
    attachAuthIsReady: true,
  })
);

const store = createStore(rootReducer, middleware);

export default store;
//export * from './user';

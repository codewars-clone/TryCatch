import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

import userReducer from './users';
import authReducer from './auth';
import likesReducer from './likes';

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  users: userReducer,
  auth: authReducer,
  likes: likesReducer,
});

export default rootReducer;

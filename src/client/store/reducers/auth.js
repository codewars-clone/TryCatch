//Action types

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const VERIFY_REQUEST = 'VERIFY_REQUEST';
export const VERIFY_SUCCESS = 'VERIFY_SUCCESS';

export const UPDATE_USER = 'UPDATE_USER';
//Action creators

const requestLogin = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

const requestUpdate = () => {
  return {
    type: UPDATE_USER,
  };
};

const receiveLogin = user => {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
};

const loginError = () => {
  return {
    type: LOGIN_FAILURE,
  };
};

const requestSignUp = () => {
  return {
    type: SIGNUP_REQUEST,
  };
};

const receiveSignUp = user => {
  return {
    type: SIGNUP_SUCCESS,
    user,
  };
};

const requestLogout = () => {
  return {
    type: LOGOUT_REQUEST,
  };
};

const receiveLogout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};
const logoutError = () => {
  return {
    type: LOGOUT_FAILURE,
  };
};
const verifyRequest = () => {
  return {
    type: VERIFY_REQUEST,
  };
};
const verifySuccess = () => {
  return {
    type: VERIFY_SUCCESS,
  };
};

//Thunks

//We dispatch requestLogin() which tells the app the user is logging in. Get the firebase.auth instance and the
//aurhentication method we want signInWithEmailAndPAssword
export const loginUser = (email, password) => {
  return async (dispatch, getState, { getFirebase }) => {
    dispatch(requestLogin());
    try {
      const firebase = getFirebase();
      const credentials = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      dispatch(receiveLogin(credentials.user.uid));
    } catch (error) {
      console.error(error);
    }
  };
};

export const signUpUser = (email, password, state) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  dispatch(requestSignUp());
  const firebase = getFirebase();
  const db = getFirestore();
  // Signs user up and dispatches
  const cred = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password);
  dispatch(receiveSignUp(cred));
  // Creating the user document
  db.collection('users')
    .doc(cred.user.uid)
    .set(state);
  // Creating the userLikes document
  db.collection('userLikes')
    .doc(cred.user.uid)
    .set({ exists: true });
};

export const updateUser = data => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const uid = firebase.auth().currentUser.uid;
  const userRef = firestore.collection('users').doc(uid);
  userRef.update(data);
  dispatch(requestUpdate());
};

//It calls firebase signOut() method
export const logoutUser = () => async (dispatch, getState, { getFirebase }) => {
  dispatch(requestLogout());
  const firebase = getFirebase();
  await firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch(receiveLogout());
    })
    .catch(error => {
      console.log(error);
      dispatch(logoutError());
    });
};

//Call the firebase onAuthStateChange(), looks for pre-existing seesion, and re-stablishes it, plus
// it also sets up a listener while the app is running to change user session tokens when they expire

export const verifyAuth = () => (dispatch, getState, { getFirebase }) => {
  dispatch(verifyRequest());
  const firebase = getFirebase();
  firebase.auth().onAuthStateChanged(user => {
    dispatch(verifySuccess());
  });
};

//Reducer

let initialState = {
  isLoggingIn: false,
  isLoggingOut: false,
  isVerifying: false,
  loginError: false,
  logoutError: false,
  isAuthenticated: false,
  user: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
        loginError: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: true,
        user: action.user,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: false,
        loginError: true,
      };
    case SIGNUP_REQUEST:
      return {
        ...state,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.user,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        isLoggingOut: true,
        logoutError: false,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggingOut: false,
        isAuthenticated: false,
        user: '',
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        isLoggingOut: false,
        logoutError: true,
      };
    case VERIFY_REQUEST:
      return {
        ...state,
        isVerifying: true,
        verifyingError: false,
      };
    case VERIFY_SUCCESS:
      return {
        ...state,
        isVerifying: false,
      };
    default:
      return state;
  }
};

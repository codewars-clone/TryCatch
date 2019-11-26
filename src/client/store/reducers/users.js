import axios from 'axios';

//initial state
const initialState = {
  users: [],
  user: {}
}
//action types
const GET_ALL_USERS = 'GET_ALL_USERS';
const GET_USER = 'GET_USER';
const GET_TRIES = 'GET_TRIES';

//action creators
const gotUsers = users => ({GET_ALL_USERS, users});
const gotUser = user => ({GET_USER, user});
//thunk creators

export const getUsers = () => async (dispatch, getState, {getFirestore})=> {
  try{
    const firestore = getFirestore();
    let data = await firestore.collection('users').get();
    let users = [];
    data.forEach(doc => {
      users.push({
        userId: doc.id,
        name: doc.data().name,
        age: doc.data().age,
        gender: doc.data().gender,
        imageUrl: doc.data().imageUrl,
      });
    });
    dispatch(gotUsers(users));
  } catch (err) {
    console.error(err);
  }
}

// export const getUser = (userId) => async dispatch => {
//   try{
//     const {data} = await axios.get(`/server/users/${userId}`);
//     dispatch(gotUser(data));
//   } catch (err) {
//     console.error(err);
//   }
// }
//reducer
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return {...state, users: [...action.users]}
    case GET_USER:
      return {...state, user: action.user}
    default:
      return state;
  }
}

export default userReducer;

import { nextTick } from "q";

const initialState = {
  currentProspect: {},
  prospects: [],
  likes: [],
  matches: []
}
const GET_PROSPECTS = 'GET_PROSPECTS';
const GET_LIKES = 'GET_LIKES';
const GET_MATCHES = 'GET_MATCHES';
const SEND_LIKE = 'SEND_LIKE';
const GET_ONE_PROSPECT = 'GET_ONE_TRY';

const gotProspects = prospects => ({type: GET_PROSPECTS, prospects});
const getOneProspect = prospect => ({type: GET_ONE_PROSPECT, prospect});
const gotLikes = likes => ({type: GET_LIKES, likes});
const gotMatches = matches => ({type: GET_MATCHES, matches});
const sentLike = () => ({type: SEND_LIKE});

export const getProspects = (userId) => async (dispatch, getState, {getFirestore}) => {
  try {
    const firestore = getFirestore();
    const users = await firestore.collection('users');
    const currentUser = await firestore.doc(`/users/${userId}`).get();
    const response = await users.where(
      'gender',
      '==',
      currentUser.data().preferences.gender
    );
    const age = await response
    .where('age', '>=', currentUser.data().preferences.age[0])
    .where('age', '<=', currentUser.data().preferences.age[1])
    .get();
    const prospects = [];
    age.forEach(doc => {
      prospects.push({
        userId: doc.id,
        name: doc.data().name,
        age: doc.data().age,
        gender: doc.data().gender,
        imageUrl: doc.data().imageUrl,
      });
    });
    dispatch(gotProspects(prospects));
  } catch (err) {
    console.error(err);
  }
}

export const getLikes = (userId) => async (dispatch, getState, {getFirestore}) => {
  try {
    const firestore = getFirestore();
    const likes = [];
    const response = await firestore.collection('likesUser').doc(userId).get();
    const data = response.data();
    data.likes.forEach(doc => {
      likes.push({
        userId: doc.id,
        name: doc.data().name,
        age: doc.data().age,
        gender: doc.data().gender,
        imageUrl: doc.data().imageUrl
      });
    });
    dispatch(gotLikes(likes));
  } catch (err) {
    console.error(err);
  }
}
export const sendLike = (userId, prospectId) => async (dispatch, getState, {getFirestore}) => {
  try{
    const firestore = getFirestore();
    const currentUser = await firestore.doc(`/users/${userId}`).get();
    const prospectUser = await firestore.doc(`/users/${prospectId}`).get();
    firestore.collection('userLikes')
      .doc(currentUser.id)
      .set({ [prospectUser.id]: true });
    firestore.collection('likedUser')
      .doc(prospectUser.id)
      .set({ [currentUser.id]: true });
      dispatch(sendLike())
  } catch (err) {
    console.error(err);
  }

}

// const getLikes = async (req, res, next) => {
//   try {
//     const likes = [];
//     const response = await db
//       .collection('likesUser')
//       .doc(req.params.userId)
//       .get();
//     const data = response.data();
//     data.likes.forEach(doc => {
//       likes.push({
//         userId: doc,
//       });
//     });
//     res.json(likes);
//   } catch (err) {
//     next(err);
//   }
// };
// const sendLike = async (req, res, next) => {
//   try {
//     const currentUser = await db.doc(`/users/${req.params.userId}`).get();
//     const likedUser = await db.doc(`/users/${req.body.user.id}`).get();
//     db.collection('userLikes')
//       .doc(currentUser.id)
//       .set({ [likedUser.id]: true });
//     db.collection('likedUser')
//       .doc(likedUser.id)
//       .set({ [currentUser.id]: true });
//   } catch (err) {
//     next(err);
//   }
// };

//reducer
const likesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROSPECTS:
      return { ...state, tries: [...action.prospects]};
    case GET_ONE_PROSPECT:
      return {...state, currentProspect: action.prospect}
    case GET_LIKES:
      return {...state, likes: [...action.likes]};
    case SEND_LIKE:
      return{...state}
    default:
      return state;
  }
};

export default likesReducer;

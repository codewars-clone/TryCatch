import { nextTick } from "q";

const initialState = {
  tries: [],
  likes: [],
  matches: []
}
const GET_TRIES = 'GET_TRIES';
const GET_LIKES = 'GET_LIKES';
const GET_MATCHES = 'GET_MATCHES';
const SEND_LIKE = 'SEND_LIKE';

const gotTries = tries => ({type: GET_TRIES, tries});
const gotLikes = likes => ({type: GET_LIKES, likes});
const gotMatches = matches => ({type: GET_MATCHES, matches});
const sendLike = () => ({type: SEND_LIKE});

export const getTries = (userId) => async (dispatch, getState, {getFirestore}) => {
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
    const tries = [];
    age.forEach(doc => {
      tries.push({
        userId: doc.id,
        name: doc.data().name,
        age: doc.data().age,
        gender: doc.data().gender,
        imageUrl: doc.data().imageUrl,
      });
    });
    dispatch(gotTries(tries));
  } catch (err) {
    console.error(err);
  }
}

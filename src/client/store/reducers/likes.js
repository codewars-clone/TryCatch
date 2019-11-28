const initialState = {
  currentProspect: {},
  prospects: [],
  likes: [],
  matches: [],
};
const GET_PROSPECTS = 'GET_PROSPECTS';
const GET_LIKES = 'GET_LIKES';
const GET_MATCHES = 'GET_MATCHES';
const SEND_LIKE = 'SEND_LIKE';
const GET_ONE_PROSPECT = 'GET_ONE_TRY';
const UNLIKE = 'UNLIKE';

const gotProspects = prospects => ({ type: GET_PROSPECTS, prospects });
const gotOneProspect = prospect => ({ type: GET_ONE_PROSPECT, prospect });
const gotLikes = likes => ({ type: GET_LIKES, likes });
const gotMatches = matches => ({ type: GET_MATCHES, matches });
const sentLike = (prospectId) => ({ type: SEND_LIKE, prospectId });
export const unLike = (prospectId) => ({type: UNLIKE, prospectId});

//cross reference likesUser to remove whomever they've already liked from prospects list, and should also
//keep track of who they've disliked and cross ref that as well
export const getProspects = userId => async (
  dispatch,
  getState,
  { getFirestore }
) => {
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
};
export const getOneProspect = () => async (
  dispatch,
  getState,
  { getFirestore }
) => {};

export const getLikes = userId => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  try {
    const firestore = getFirestore();
    const likes = [];
    const response = await firestore
      .collection('likesUser')
      .doc(userId)
      .collection('likes').get();
    const data = response.data();
    data.forEach(doc => {
      likes.push({
        userId: doc.userId,
        name: doc.data().name,
        age: doc.data().age,
        gender: doc.data().gender,
        imageUrl: doc.data().imageUrl,
        message: doc.data().message,
      });
    });
    dispatch(gotLikes(likes));
  } catch (err) {
    console.error(err);
  }
};
export const sendLike = (prospectId, message) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  try {
    const firestore = getFirestore();
    const { users } = getState();
    //const user = await firestore.collection('users').doc(currentUserId).get();
    //const prospectUser = await firestore.doc(`/users/${prospectId}`);
    const user = users.user;
    console.log('message in sendLike', message)
    const userData = {
      "userId": user.id || null,
      "name": user.firstName || null,
      "age": user.age || null,
      "gender": user.gender || null,
      "imageUrl": user.imageUrl || null,
      "message": message || null,
    }
    await firestore
      .collection('userLikes')
      .doc(user.id)
      .set({ [prospectId]: true });
      console.log("prospectId:", prospectId);
    const prospectUser = await firestore.collection('likesUser').doc(prospectId).collection('likes');
    //console.log("prospectUser:" , response)
    // const snapshot = await firestore.collection('likesUser').doc(prospectId).get();
    // const hasLikes = snapshot.data();
    await prospectUser.doc(user.id).set(userData);
    console.log('subcollection version: added like')
    dispatch(sentLike(prospectId));

    //check if prospectUser has liked current user. If so, it is a match
    // const matchQuery = await firestore
    //   .doc(`/userLikes/${prospectId}`)
    //   .where(currentUserId, '==', true);
    // if (matchQuery.exists) {
      //set up match
      //set up chat
      // const newChat = await firestore.collection('chats').add({user1: currentUserId, user2: prospectId});
      // const newMatch1 = await firestore.collection('matches').doc(currentUserId).set({userId: prospectId, chatId: newChat.id});
      // const newMatch2 = await firestore.collection('matches').doc(prospectId).set({userId: currentUserId, chatId: newChat.id})
    //}
  } catch (err) {
    console.error(err);
  }
};

//reducer
const likesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROSPECTS:
      return { ...state, prospects: [...action.prospects] };
    case GET_ONE_PROSPECT:
      return { ...state, currentProspect: action.prospect };
    case GET_LIKES:
      return { ...state, likes: [...action.likes] };
    case SEND_LIKE:
      const removed = state.prospects.filter(prospect => prospect.userId !== action.prospectId);
      return { ...state, prospects: [...removed] };
    case UNLIKE:
      const removeUser = state.prospects.filter(prospect => prospect.userId !== action.prospectId);
      return {...state, prospects: [...removeUser] };
    default:
      return state;
  }
};

export default likesReducer;

/* eslint-disable default-case */
// ACTION TYPES
const CREATE_CHAT = 'CREATE_CHAT';
const GET_CHAT = 'GET_CHAT';
const ADD_MESSAGE = 'ADD_MESSAGE';
const UPDATE_CHAT = 'UPDATE_CHAT';

export const createChat = chats => {
  return {
    type: CREATE_CHAT,
    chats,
  };
};

export const getChat = chatId => {
  return {
    type: GET_CHAT,
    chatId,
  };
};

export const addMessage = message => {
  return {
    type: ADD_MESSAGE,
    message,
  };
};

export const updateChat = chatId => {
  return {
    type: UPDATE_CHAT,
    chatId,
  };
};

//thunk
export const getChatsThunk = () => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  try {
    const db = getFirestore();
    const { firebase } = getState();
    const userId = firebase.auth.uid;
    let data = await db.collection('chats').get();
    let chats = [];
    data.forEach(doc => {
      chats.push(doc.data());
    });
    const filteredChats = chats.filter(chat => {
      return (chat.people[0].id === userId || chat.people[1].id === userId)
    })
    const list = [];
    filteredChats.forEach(chat => {
      chat.people.forEach(person => {
        if(person.id !== userId){
          const updatedChat = {
            chatId: chat.chatId,
            name: person.name,
            image: person.image
          }
          list.push(updatedChat)
        }
      })
    })
    dispatch(createChat(list));
  } catch (error) {
    console.error(error);
  }
};

export const createChatThunk = newChat => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  try {
    const db = getFirestore();
    db.collection('chats').doc(`${newChat.chatId}`).set(newChat)
    dispatch(getChatsThunk());
  } catch (error) {
    console.error(error);
  }
};

export const addMessageThunk = message => async (
  dispatch,
  getState,
  { getFirestore}
) => {
  try {
    const db = getFirestore();
    const chat = await db.collection('chats').doc(`${message.chatId}`).update({
      messages: db.FieldValue.arrayUnion(message)
    })
  } catch (error) {
    console.error(error);
  }
};

export const messageListener = (chatId) => async (
  dispatch,
  getState,
  { getFirestore}
  ) => {
    try {
      const db = getFirestore();
      const chat = await db.collection('chats').doc(`${chatId}`).onSnapshot( doc => {
      dispatch(getChat(doc.data().chatId))
      })
    } catch (error) {
      console.error(error)
    }
  }

const initialState = {
  chats: [],
  currChat: [],
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CHAT:
      return { ...state, chats: [...action.chats] };
    case GET_CHAT:
      let newChat = state.chats.filter(chat => {
        if (chat.chatId === action.chatId) {
          return chat;
        }
      });

      return { ...state, currChat: newChat };
    case ADD_MESSAGE:
      const updatedCurrChat = state.currChat.map(chat => {
        if (chat.chatId === action.message.chatId) {
          chat.messages = [...chat.messages, action.message];
        }
        return chat;
      });
      return {
        ...state,
        currChat: [...updatedCurrChat],
      };
    default:
      return state;
  }
};

export default chatReducer;

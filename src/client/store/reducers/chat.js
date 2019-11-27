/* eslint-disable default-case */
// ACTION TYPES
const CREATE_CHAT = 'CREATE_CHAT';
const GET_CHAT = 'GET_CHAT';
const ADD_MESSAGE = 'ADD_MESSAGE';

export const createChat = ({ chatId, name, people, image, messages = [] }) => {
  console.log('TCL: createChat -> chatId,', chatId);
  return {
    type: CREATE_CHAT,
    chat: {
      chatId,
      name,
      people,
      image,
      messages,
    },
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

const initialState = {
  chats: [],
  currChat: [],
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CHAT:
      return { ...state, chats: [...state.chats, action.chat] };
    case GET_CHAT:
      let newChat = state.chats.filter(chat => {
        if (chat.chatId === action.chatId) {
          return chat;
        }
      });
      console.log('newChat => ', newChat);
      return { ...state, currChat: newChat[0] };
    case ADD_MESSAGE:
      return;
    default:
      return state;
  }
};

export default chatReducer;

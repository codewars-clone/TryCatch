/* eslint-disable default-case */
// ACTION TYPES
const CREATE_CHAT = 'CREATE_CHAT';
const GET_CHAT = 'GET_CHAT';
const ADD_MESSAGE = 'ADD_MESSAGE';
const UPDATE_CHAT = 'UPDATE_CHAT';

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

export const updateChat = chatId => {
  return {
    type: UPDATE_CHAT,
    chatId,
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
    case UPDATE_CHAT:
      const updateChats = state.chats.map(chat => {
        if (chat.chatId === action.chatId) {
          chat.messages = [...state.currChat[0].messages];
        }
        return chat;
      });
      return {
        ...state,
        chats: [...updateChats],
      };

    default:
      return state;
  }
};

export default chatReducer;

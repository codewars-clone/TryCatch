/* eslint-disable default-case */
// ACTION TYPES
const CREATE_CHAT = 'CREATE_CHAT'
const GET_CHAT = 'GET_CHAT'

export const createChat = ({ chatId, name, people, image, messages = []}) => {
  console.log("TCL: createChat -> chatId,", chatId)
  return {
    type: CREATE_CHAT,
    chat: {
      chatId,
      name,
      people,
      image,
      messages
    }
  }
}

export const getChat = (chatId) => {
  return {
type: GET_CHAT,
chatId
  }
}

const initialState = {
  chats: [],
  currChat:{}
}

const chatReducer = (state = initialState, action) => {
  switch(action.type){
    case CREATE_CHAT:
      return {...state, chats: [...state.chats, action.chat]}
      case GET_CHAT:
        let newChat = state.chats.filter((chat) => {
          if(chat.chatId === action.chatId){
            return chat
          }
        })
        console.log('newChat => ', newChat)
        return {...state, currChat:newChat[0]}
    default:
      return state
  }
}

export default chatReducer

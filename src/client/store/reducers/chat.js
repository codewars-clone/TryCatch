/* eslint-disable default-case */
// ACTION TYPES
const CREATE_CHAT = 'CREATE_CHAT'

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

const initialState = {
  chats: []
}

const chatReducer = (state = initialState, action) => {
  switch(action.type){
    case CREATE_CHAT:
      return {...state, chats: action.chat}
    default:
      return state
  }
}

export default chatReducer

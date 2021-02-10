import {
    GET_CHATS,
    CHAT_ERROR,
    UPDATE_LIKES,
    DELETE_CHAT,
    ADD_CHAT,
    GET_CHAT,
    ADD_COMMENT,
    REMOVE_COMMENT,
    DELETE_CHAT
  } from '../actions/types';
  
  const initialState = {
    chats: [],
    chat: null,
    loading: true,
    error: {}
  };
  
  function chatReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_CHATS:
        return {
          ...state,
          chats: payload,
          loading: false
        };
      case GET_CHAT:
        return {
          ...state,
          chat: payload,
          loading: false
        };
      case ADD_CHAT:
        return {
          ...state,
          chats: [payload, ...state.chats],
          loading: false
        };
      case DELETE_CHAT:
        return {
          ...state,
          chats: state.chats.filter((chat) => chat._id !== payload),
          loading: false
        };
      case CHAT_ERROR:
        return {
          ...state,
          error: payload,
          loading: false
        };
      case UPDATE_LIKES:
        return {
          ...state,
          chats: state.chats.map((chat) =>
            chat._id === payload.id ? { ...chat, likes: payload.likes } : chat
          ),
          loading: false
        };
      case ADD_COMMENT:
        return {
          ...state,
          chat: { ...state.chat, comments: payload },
          loading: false
        };
      case REMOVE_COMMENT:
        return {
          ...state,
          chat: {
            ...state.chat,
            comments: state.chat.comments.filter(
              (comment) => comment._id !== payload
            )
          },
          loading: false
        };
      default:
        return state;
    }
  }
  
  export default chatReducer;
  
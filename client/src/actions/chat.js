import api from '../utils/api';
import { setAlert } from './alert';
import {
  GET_CHATS,
  CHAT_ERROR,
  UPDATE_LIKES,
  DELETE_CHAT,
  ADD_CHAT,
  GET_CHAT,
  ADD_COMMENT,
  REMOVE_COMMENT
} from './types';

// Get CHATS
export const getChats = () => async dispatch => {
  try {
    const res = await api.get('/chats');

    dispatch({
      type: GET_CHATS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CHAT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add like
export const addLike = id => async dispatch => {
  try {
    const res = await api.put(`/chats/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: CHAT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Remove like
export const removeLike = id => async dispatch => {
  try {
    const res = await api.put(`/chats/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: CHAT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete chat
export const deleteChat = id => async dispatch => {
  try {
    await api.delete(`/chats/${id}`);

    dispatch({
      type: DELETE_CHAT,
      payload: id
    });

    dispatch(setAlert('Chat Removed', 'success'));
  } catch (err) {
    dispatch({
      type: CHAT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add chat
export const addChat = formData => async dispatch => {
  try {
    const res = await api.chat('/chats', formData);

    dispatch({
      type: ADD_CHAT,
      payload: res.data
    });

    dispatch(setAlert('Chat Created', 'success'));
  } catch (err) {
    dispatch({
      type: CHAT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get chat
export const getChat = id => async dispatch => {
  try {
    const res = await api.get(`/chats/${id}`);

    dispatch({
      type: GET_CHAT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CHAT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add comment
export const addComment = (chatId, formData) => async dispatch => {
  try {
    const res = await api.chat(`/chats/comment/${chatId}`, formData);

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch({
      type: CHAT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete comment
export const deleteComment = (chatId, commentId) => async dispatch => {
  try {
    await api.delete(`/chats/comment/${chatId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });

    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: CHAT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

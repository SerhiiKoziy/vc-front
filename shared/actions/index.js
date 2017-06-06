import * as types from '../constants/ActionTypes';
import { getAllUsersAPI,
         getUserAPI, createUserAPI, updateUserAPI, deleteUserAPI, sendMailAPI } from './api';

export function addDataBase(payload) {
  return {
    type: types.ADD_DATA,
    payload,
  };
}
// GET ALL USERS from API
export function getUsers() {
  return (dispatch) => {
    getAllUsersAPI().then(res => {
      // console.log('res', res);
      dispatch(addDataBase(res.data));
    });
  };
}
// POST to API
export function createUser(dataCV) {
  return (dispatch) => {
    createUserAPI(dataCV).then(res => {
      console.log('createUser res', res.data);
      dispatch(getUsers());
    });
  };
}
// PUT to API
export function updateUser(dataCV) {
  return (dispatch) => {
    updateUserAPI(dataCV).then(res => {
      console.log('updateUser res', res);
      dispatch(getUsers());
    });
  };
}

// GET ONE USER from API
export function getUser(userId) {
  return () => {
    getUserAPI(userId).then(res => {
      if (res) {
        // console.log('res getUser', res);
        // dispatch(getUsers());
      }
    });
  };
}
// DELETE to API
export function deleteUser(userId) {
  return (dispatch) => {
    deleteUserAPI(userId).then(res => {
      if (res) {
        // console.log('res delete', res);
        dispatch(getUsers());
      }
    });
  };
}

export function letterSent(payload) {
  return {
    type: types.LETTER_SENT,
    payload,
  };
}
// SEND_MAIL to API
export function sendMail(userId, clientMail) {
  return (dispatch) => {
    sendMailAPI(userId, clientMail).then(res => {
      if (res) {
        console.log('res sendMail', res);
        dispatch(letterSent(res.statusText));
      }
    });
  };
}

import * as types from '../constants/ActionTypes';
import { getAllUsersAPI, saveImageAPI,
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
    })
      .catch((error) => {
        console.log('addDataBase error', error);
      });
  };
}
// POST to API
export function createUser(dataCV) {
  return (dispatch) => {
    createUserAPI(dataCV).then(res => {
      console.log('createUser res', res.data);
      dispatch(getUsers());
    })
      .catch((error) => {
        console.log('createUser error', error);
      });
  };
}
export function saveFile(dataCV) {
  console.log('saveFile', dataCV);
  return (dispatch) => {
    saveImageAPI(dataCV).then(res => {
      console.log('saveImage res', res);
      dispatch(getUsers());
    })
      .catch((error) => {
        console.log('saveImage error', error);
      });
  };
}
// PUT to API
export function updateUser(dataCV) {
  return (dispatch) => {
    updateUserAPI(dataCV).then(res => {
      console.log('updateUser res', res);
      dispatch(getUsers());
    })
      .catch((error) => {
        console.log('updateUser error', error);
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
    })
      .catch((error) => {
        console.log('getUser error', error);
      });
  };
}
// DELETE to API
export function deleteUser(userId) {
  return (dispatch) => {
    deleteUserAPI(userId).then(res => {
      if (res) {
        console.log('res delete', res);
        dispatch(getUsers());
      }
    })
    .catch((error) => {
      console.log(error);
    });
  };
}

export function letterSent(payload) {
  return {
    type: types.LETTER_SENT,
    payload,
  };
}
export function requestLetter() {
  return {
    type: types.REQUEST_LETTER,
  };
}
// SEND_MAIL to API
export function sendMail(userId, clientMail) {
  return (dispatch) => {
    dispatch(requestLetter());
    sendMailAPI(userId, clientMail).then(res => {
      if (res) {
        console.log('res sendMail', res);
        dispatch(letterSent(res));
      }
    })
      .catch((error) => {
        console.log('catch send error', error);
      });
  };
}

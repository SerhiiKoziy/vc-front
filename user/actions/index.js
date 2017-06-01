import * as types from '../constants/ActionTypes';
import { getAllUsersAPI, getUserAPI, createUserAPI, updateUserAPI, deleteUserAPI } from './api';

export function addDataBase(payload) {
  // console.log('payload', payload);
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
export function editTask(payload) {
  return {
    type: types.UPDATE_CV,
    payload,
  };
}

export function createTask(payload) {
  return {
    type: types.ADD_CV,
    payload,
  };
}

export function deleteTask(taskId) {
  return {
    type: types.DELETE_CV,
    payload: taskId,
  };
}

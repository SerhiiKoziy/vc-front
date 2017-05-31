import * as types from '../constants/ActionTypes';
import { getAllUsersAPI, getUserAPI, createNewCvAPI, deleteUserAPI } from './api';

//POST to API
export function createUser(dataCV) {
  return (dispatch) => {
    createNewCvAPI(dataCV).then(res => {
      //console.log('createUser res', res);
      dispatch(getUsers());
    });
  };
}
//GET ALL USERS from API
export function getUsers() {
  return (dispatch) => {
    getAllUsersAPI().then(res => {
      //console.log('res', res);
      dispatch(addDataBase(res.data));
    });
  };
}
//GET ONE USER from API
export function getUser(userId) {
  return (dispatch) => {
    getUserAPI(userId).then(res => {
      if(res){
        //console.log('res getUser', res);
        // dispatch(getUsers());
      }
    });
  };
}
//DELETE to API
export function deleteUser(userId) {
  return (dispatch) => {
    deleteUserAPI(userId).then(res => {
      if(res){
        //console.log('res delete', res);
        dispatch(getUsers());
      }
    });
  };
}


export function addDataBase(payload) {
  // console.log('payload', payload);
  return {
    type: types.ADD_DATA,
    payload,
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

import * as types from '../constants/ActionTypes';
import { getAllUsers } from './api';

export function setList(payload) {
  return {
    type: types.SET_LIST,
    payload,
  };
}

export function getUsers() {
  return (dispatch) => {
    getAllUsers().then(res => {
      console.log('res', res);
      // dispatch(updateTask(task));
    });
  };
}

export function editTask(payload) {
  return {
    type: types.UPDATE_CV,
    payload,
  };
}
/* export function getUsers(payload) {
  return {
    type: types.UPDATE_TASK,
    payload,
  };
}*/
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




export function editTask2(task) {
  return (dispatch) => {
    /* getWeatherByCoordinates(task).then(weather => {
      task.weather = weather;
      dispatch(updateTask(task));
    }
    );*/
  };
}

export function createTask2(task) {
  return (dispatch) => {
    console.log(task);
    dispatch(addTask(task));
    /* getWeatherByCoordinates(task).then(
      (weather) => {
        const taskWithWeather = { weather, ...task };
        dispatch(addTask(taskWithWeather));
      }
    );*/
  };
}

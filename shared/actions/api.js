/* eslint-disable no-console */
import * as API from '../constants/Api';
import axios from 'axios';


export function getAllUsersAPI() {
  return axios.get(API.GET_USERS).then((response) => {
    if (response) {
      return response;
    }
    if (response.error) {
      throw new Error(response.error);
    }
    return null;
  }).catch(error => {
    console.error(error);
  });
}
export function getUserAPI(userId) {
  return axios.get(`${API.GET_USER}/${userId}`).then((response) => {
    if (response) {
      return response;
    }
    if (response.error) {
      throw new Error(response.error);
    }
    return null;
  }).catch(error => {
    console.error(error);
  });
}
export function createUserAPI(dataCV) {
  console.log('createUserAPI', dataCV);
  return axios.post(API.POST_USER, dataCV).then((response) => {
    if (response) {
      return response;
    }
    if (response.error) {
      console.log('response', response.error);
      throw new Error(response.error);
    }
    return null;
  }).catch(error => {
    console.error(error);
  });
}
export function updateUserAPI(dataCV) {
  console.log('updateUserAPI', dataCV);
  return axios.put(`${API.GET_USER}/${dataCV.id}`, dataCV).then((response) => {
    if (response) {
      return response;
    }
    if (response.error) {
      console.log('response', response.error);
      throw new Error(response.error);
    }
    return null;
  }).catch(error => {
    console.error(error);
  });
}
export function deleteUserAPI(userId) {
  return axios.delete(`${API.DELETE_USER}/${userId}`).then((response) => {
    if (response) {
      return response;
    }
    if (response.error) {
      console.log('response', response.error);
      throw new Error(response.error);
    }
    return null;
  }).catch(error => {
    console.error(error);
  });
}

export function sendMailAPI(userId, data) {
  const from = typeof data !== 'object' ? { data } : data;
  console.log('sendMailAPI serv', userId, from);
  return axios.post(`${API.SEND_MAIL}/${userId}/contact`, from).then((response) => {
    if (response) {
      return response;
    }
    if (response.error) {
      console.log('response', response.error);
      throw new Error(response.error);
    }
    return null;
  }).catch(error => {
    console.error(error);
  });
}

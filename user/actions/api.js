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
export function getUserAPI(user_id) {
  return axios.get(`${API.GET_USER}/${user_id}`).then((response) => {
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
export function createNewCvAPI(dataCV) {
  console.log('dataCV', dataCV)
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

export function deleteUserAPI(user_id) {
  return axios.delete(`${API.DELETE_USER}/${user_id}`).then((response) => {
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
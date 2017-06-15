/* eslint-disable no-console */
import { resolveUrl } from '../constants/Api';
import axios from 'axios';


export function getAllUsersAPI() {
  return axios.get(resolveUrl('user')).then((response) => {
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
  return axios.get(resolveUrl(`user/${userId}`)).then((response) => {
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
  return axios.post(resolveUrl('user/create'), dataCV).then((response) => {
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
  return axios.put(resolveUrl('user'), dataCV).then((response) => {
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
  return axios.delete(resolveUrl(`user/${userId}`)).then((response) => {
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
  return axios.post((resolveUrl('user/contact')), { userId, from }).then((response) => {
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

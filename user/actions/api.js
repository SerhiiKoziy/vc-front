/* eslint-disable no-console */
import * as API from '../constants/Api';
import axios from 'axios';


export function getAllUsers() {
  return axios.get(API.GET_USERS).then((response) => {
    console.log('response', response);
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

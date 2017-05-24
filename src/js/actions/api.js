/* eslint-disable no-console */
import * as API from '../constants/Api';
import axios from 'axios';


export function getAllUsers() {
  return axios.get(API.GET_USERS).then((response) => {
    console.log('response', response)
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
export function setStudentProfileField() {
  return dispatch => {
    axios.post(API.SET, {
      field: 'position',
      value: 'test',
    })
      .then(function ({ data }) {
        try {

          if (data.error)  throw new Error(data.error);

          dispatch(receiveProfile(data));
        } catch (e) {
          console.log(data.error);
        }
      })
      .catch(function (error) {
        console.log(error);
      });

  }
}
import * as types from '../constants/ActionTypes';
import { INITIAL_STATE } from '../constants/InitialState';

export default function DataReducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  // const data = state;
  switch (type) {
    case types.ADD_DATA:
      const selectOptions = [];
      payload.map((cv) => {
        if (!!cv.title) {
          selectOptions.push({ value: cv.title, label: cv.title });
        }
        if (cv.skills) {
          cv.skills.map((skill) => {
            if (skill.main === true) {
              selectOptions.push({ value: skill.skill, label: skill.skill });
            }
          });
        }
      });
      return {
        ...state,
        data: payload,
        options: selectOptions,
      };

    case 'LETTER_SENDED':
      console.log('1', payload)
      return {
        ...state,
        sended: payload,
      };
    case 'SET_AREA':
      return {
        ...state,
        application: payload,
      };
    // case types.UPDATE_CV:
    //   const filteredElements = data.filter(element => {
    //     return element.id !== payload.id;
    //   });
    //   return [...filteredElements, payload];

    default:
      return state;
  }
}

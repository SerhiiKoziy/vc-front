import * as types from '../constants/ActionTypes';
import { INITIAL_STATE } from '../constants/InitialState';

export default function DataReducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  // const data = state;
  switch (type) {
    case types.ADD_DATA:
      const selectOptions = [];
      const selectOptionsTitle = [];
      payload.map((cv) => {
        if (!!cv.title) {
          //  selectOptionsTitle = [
          // {
          //   value: 'java',
          //   label: 'java',
          // },
          // ]
          if (selectOptionsTitle.length > 0) {
            let check = 0;
            selectOptionsTitle.map((opt, i, arr) => {
              if (opt.value !== cv.title) {
                check += 1;
                if (arr.length === check) {
                  selectOptionsTitle.push({ value: cv.title, label: cv.title });
                }
              }
              return null;
            });
          } else {
            selectOptionsTitle.push({ value: cv.title, label: cv.title });
          }
        }
        if (cv.skills) {
          cv.skills.map((skill) => {
            if (skill.main === true) {
              if (selectOptions.length > 0) {
                let check = 0;
                selectOptions.map((skl, i, arr) => {
                  if (skl.value !== skill.skill) {
                    check += 1;
                    if (arr.length === check) {
                      selectOptions.push({ value: skill.skill, label: skill.skill });
                    }
                  }
                  return null;
                });
              } else {
                selectOptions.push({ value: skill.skill, label: skill.skill });
              }
            }
            return null;
          });
        }
        return null;
      });
      return {
        ...state,
        data: payload,
        options: selectOptions,
        optionsTitle: selectOptionsTitle,
      };

    case 'LETTER_SENT':
      // console.log('1', payload);
      return {
        ...state,
        sent: payload,
        sentText: payload.statusText,
        sending: false,
      };
    case 'REQUEST_LETTER':
      return {
        ...state,
        sending: true,
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

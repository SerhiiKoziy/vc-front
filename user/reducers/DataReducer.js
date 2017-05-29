import * as types from '../constants/ActionTypes';
import { INITIAL_STATE } from '../constants/InitialState';

export default function DataReducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  //const data = state;
  switch (type) {
    case types.ADD_CV:
      return [...data, payload];


    case types.DELETE_CV:
      return data.filter(item => {
        return item.id !== payload;
      });

    case types.ADD_DATA:
      const selectOptions = [];
      const CVMock = [
        {
          title: 'title',
          skills: [
            {
              main: true,
              skill: 'php',
            },
            {
              main: true,
              skill: 'java',
            }

          ]
        },
        {
          title: 'title2',
        }
      ];

      payload.map((cv) => {
        if(!!cv.title){
          selectOptions.push({ value: cv.title, label: cv.title });
        }

        if(cv.skills){
          cv.skills.map((skill) => {
            if(skill.main === true){
              selectOptions.push({ value: skill.skill, label: skill.skill });
            }
          })
        }
      });
      console.log('selectOptions', selectOptions);
      return {
        ...state,
        data:payload,
        options: selectOptions
      };


    case types.UPDATE_CV:
      const filteredElements = data.filter(element => {
        return element.id !== payload.id;
      });
      return [...filteredElements, payload];

    /*case types.SET_LIST:
      return payload;*/

    default:
      return state;
  }
}

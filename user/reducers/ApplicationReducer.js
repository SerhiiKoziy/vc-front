import * as types from '../constants/ActionTypes';
import { INITIAL_STATE } from '../constants/InitialState';

export default function ApplicationReducer(state = {}, action) {
  const { type, payload } = action;
  switch (type) {
    case 'SET_AREA':
      return {
        ...state,
        area: payload
      };
    case types.ADD_DATA:
      console.log('state', state, 'payload', payload);
      return {
        ...state,
        dataBase: payload
      };

    default:
      return state;
  }
}

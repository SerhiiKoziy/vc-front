import * as types from '../constants/ActionTypes';
import { INITIAL_STATE } from '../constants/InitialState';

export default function ApplicationReducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case 'SET_AREA':
      return {
        ...state,
        application: payload,
      };
    default:
      return state;
  }
}

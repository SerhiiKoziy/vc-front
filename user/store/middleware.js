/* eslint-disable no-console */
import { ADD_CV, UPDATE_CV, DELETE_CV } from '../constants/ActionTypes';
const updateActions = { ADD_CV, UPDATE_CV, DELETE_CV };

function shouldLocalStorageUpdate(actionType) {
  return updateActions.hasOwnProperty(actionType);
}

const updateLocalStorage = store => {
  return next => {
    return action => {
      const result = next(action);
      if (shouldLocalStorageUpdate(action.type)) {
        console.info('Updating localstorage', store.getState().data);
        localStorage.setItem('LocalStorageTaskList', JSON.stringify(store.getState().data));
      }

      return result;
    };
  };
};

//export default updateLocalStorage;

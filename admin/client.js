import React from 'react';
import { render } from 'react-dom';
import { browserHistory, match } from 'react-router';
import getEntry from '../shared/EntryComponent';
import configureStore from '../user/store/configureStore';
import { setList } from '../user/actions';
import getRoutes from './routes';
import '../sass/common.scss';

const { store, history } = configureStore(browserHistory, window.App);

/*if (localStorage.getItem('LocalStorageTaskList')) {
  const string = localStorage.getItem('LocalStorageTaskList');
  try {
    const tasksList = JSON.parse(string);
    store.dispatch(setList(tasksList));
  } catch (e) {
    console.error('JSON parsing error:', e);
  }
}*/
match({
  history,
  routes: getRoutes(store),
}, (error, redirectLocation, renderProps) => {
  render(
    getEntry(false, store, renderProps)
    , document.getElementById('app'));
});



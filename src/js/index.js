import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory, Route, IndexRoute } from 'react-router';
import configureStore from './store/configureStore';
import { setList } from './actions';
import Root from './pages/Root';
import DashBoard from './pages/DashBoard';
import TaskPage from './pages/TaskPage';
import EditTask from './pages/EditTask';
import MainPage from './pages/MainPage';
import '../sass/common.scss';

const { store, history } = configureStore(hashHistory);

if (localStorage.getItem('LocalStorageTaskList')) {
  const string = localStorage.getItem('LocalStorageTaskList');
  try {
    const tasksList = JSON.parse(string);
    store.dispatch(setList(tasksList));
  } catch (e) {
    console.error('JSON parsing error:', e);
  }
}

render(
  <Provider store={store}>
    <Router history={history}>
      <Route name="Root" path="/" component={Root}>

        <Route name="task" path="task/:taskId" component={TaskPage}>
          <Route name="EditTask" path="edit" component={EditTask} />
        </Route>
        <Route name="DashBoard" path="DashBoard" component={DashBoard} />
        <Route name="MainPage" path="MainPage" component={MainPage} />
        <IndexRoute name="MainPage" component={MainPage} />
      </Route>
    </Router>
  </Provider>
  , document.getElementById('app'));

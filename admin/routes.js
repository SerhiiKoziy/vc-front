import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Root from '../shared/pages/Root';
import TaskPage from '../shared/pages/TaskPage';
import EditTask from '../shared/pages/EditTask';
import DashBoard from '../shared/pages/DashBoard';
import { getUsers } from '../shared/actions';

export default function getRoutes(store) {
  function isDataStored() {
    const state = store.getState();
    const data = state.data.data;
    if (data && data.length > 0) {
      return true;
    }

    return false;
  }
  function checkMainRoute(nextState, replace) {
    if (!isDataStored()) {
      store.dispatch(getUsers());
    }
  }
  let base = '/admin';
  return (
    <Route name="Root" path={base} component={Root} onEnter={checkMainRoute}>
      <Route name="task" path={`${base}/task/:taskId`} component={TaskPage}>
        <Route name="EditTask" path={`${base}/task/:taskId/edit`} component={EditTask} />
      </Route>
      <IndexRoute name="DashBoard" component={DashBoard} />
    </Route>
  );
}


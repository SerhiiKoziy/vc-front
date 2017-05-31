import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Root from '../user/pages/Root';
import TaskPage from '../user/pages/TaskPage';
import EditTask from '../user/pages/EditTask';
import DashBoard from '../user/pages/DashBoard';

export default function getRoutes(store){
  let base = "/admin";
  return (
    <Route name="Root" path={base} component={Root}>
      <Route name="task" path={`${base}/task/:taskId`} component={TaskPage}>
        <Route name="EditTask" path={`${base}/task/:taskId/edit`} component={EditTask} />
      </Route>
      <IndexRoute name="DashBoard" component={DashBoard} />
    </Route>
  );
}
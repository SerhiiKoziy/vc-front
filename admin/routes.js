import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Root from '../user/pages/Root';
import TaskPage from '../user/pages/TaskPage';
import EditTask from '../user/pages/EditTask';
import DashBoard from '../user/pages/DashBoard';

export default function getRoutes(store){

  return (
    <Route name="Root" path="/admin" component={Root}>
      <Route name="task" path="task/:taskId" component={TaskPage}>
        <Route name="EditTask" path="edit" component={EditTask} />
      </Route>
      <IndexRoute name="DashBoard" component={DashBoard} />
    </Route>
  );
}
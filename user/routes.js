import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Root from './pages/Root';
import DashBoard from './pages/DashBoard';
import TaskPage from './pages/TaskPage';
import EditTask from './pages/EditTask';
import MainPage from './pages/MainPage';
import FilterPage from './pages/FilterPage';

export default function getRoutes(store){

  return (
    <Route name="Root" path="/" component={Root}>
      <Route name="task" path="task/:taskId" component={TaskPage}>
        <Route name="EditTask" path="edit" component={EditTask} />
      </Route>
      <Route name="DashBoard" path="DashBoard" component={DashBoard} />
      <Route name="MainPage" path="MainPage" component={MainPage} />
      <Route name="FilterPage" path="FilterPage" component={FilterPage} />
      <IndexRoute name="MainPage" component={MainPage} />
    </Route>
  );
}
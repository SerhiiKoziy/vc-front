import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Root from '../shared/pages/Root';
import PageCV from '../shared/pages/PageCV';
import EditCV from '../shared/pages/EditCV';
import SendPage from '../shared/pages/SendPage';
import FilterPage from '../shared/pages/FilterPage';
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
  function checkMainRoute() {
    if (!isDataStored()) {
      store.dispatch(getUsers());
    }
  }
  // let base = "/client";
  return (
    <Route name="Root" path="/" component={Root} onEnter={checkMainRoute}>
      <Route name="cv" path="cv/:cvId" component={PageCV}>
        <Route name="EditTask" path="edit" component={EditCV} />
      </Route>
      <Route name="SendPage" path="send/:cvId" component={SendPage} />
      <IndexRoute name="FilterPage" component={FilterPage} />
    </Route>
  );
}

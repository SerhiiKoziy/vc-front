import React from 'react';
import ReactDOM from 'react-dom/server';
import { match } from 'react-router';
import createMemoryHistory from 'react-router/lib/createMemoryHistory';
import getEntry from '../../shared/EntryComponent';
import Html from '../../shared/components/Html';
import configureStore from '../../user/store/configureStore';
import getUserRoutes from '../../user/routes';
import getAdminRoutes from '../../admin/routes';

export default function createHandler(AREA) {
  return (req, res) => {
    console.log(req.originalUrl);
    const memoryHistory = createMemoryHistory(req.originalUrl);
    const { store, history } = configureStore(memoryHistory);
    const getRoutes = AREA === 'user' ? getUserRoutes : getAdminRoutes;

    store.dispatch({
      type: 'SET_AREA',
      payload: AREA,
    });
    match({
      history: history,
      routes: getRoutes(store),
      location: req.originalUrl,
    }, (error, redirectLocation, renderProps) => {
      if (redirectLocation) {
        res.redirect(redirectLocation.pathname + redirectLocation.search)
      } else if (error) {
        res.send(error);
      } else if (renderProps) {
        console.log(renderProps);
        const html = ReactDOM.renderToStaticMarkup(
          <Html area={AREA} store={store}>
          {getEntry(true, store, renderProps)}
          </Html>
        );
        res.status(200).type('html').send(`<!DOCTYPE html>${html}`)
      } else {
        res.status(404).send('not found')
      }
    });
  }
}
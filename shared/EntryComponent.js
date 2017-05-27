import React from 'react';
import { Router ,RouterContext} from 'react-router';
import { Provider } from 'react-redux';
export default function (isServer, store, renderProps) {
  const RouterComponent = isServer ? RouterContext : Router;
  return (
    <Provider store={store}>
      <RouterComponent {...renderProps} />
    </Provider>
  );
}
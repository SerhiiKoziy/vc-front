import React from 'react';
import serialize from 'serialize-javascript';
import ReactDOM from 'react-dom/server';
import Home from '../components/Home.js';
const isLocal = process.env.NODE_ENV === 'development';

function renderJsFiles() {
  const res = [];
  if (isLocal) {
    res.push('../build/js/main.js');
  } else {
    res.push('../build/js/vendor.bundle.js');
    res.push('../build/js/main.min.js');
  }
  return res;
}

const Html = (props) => {
  const content = props.component ? ReactDOM.renderToString(props.component) : '';
  const state = props.store.getState();
  return (
    <Home />
  );
};

Html.propTypes = {
  component: React.PropTypes.object,
  store: React.PropTypes.object,
};

export default Html;

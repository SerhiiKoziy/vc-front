import React from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';

function renderJs(area) {
  return (
    <script type="text/javascript" src={`/public/js/${area}-main.js`} />
  );
}

export default class Html extends React.PureComponent {
  static propTypes = {
    content: React.PropTypes.string,
    area: React.PropTypes.string,
    store: React.PropTypes.object,
  };

  render() {
    const htmlContent = ReactDOM.renderToString(this.props.children);
    return (
      <html>
        <head>
          <title>Cv-manager</title>
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        </head>
        <body>
          <main id="app" dangerouslySetInnerHTML={{ __html: htmlContent }} />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.App = ${serialize(this.props.store.getState())}`,
            }}
          />
        {renderJs(this.props.area)}
        </body>
      </html>
    );
  }
}

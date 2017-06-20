const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  proxy: {
    '**': {
      target: 'http://localhost:3002',
    },
  },
}).listen(7070, 'localhost', (err) => {
  if (err) { return console.log(err); }
  return null;
  // console.log(result, 'Listening at http://localhost:9090/');
});

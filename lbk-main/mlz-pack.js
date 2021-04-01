const path = require('path');
const config = require('./config');
module.exports = {
  webpack: {
    publicPath: config.buildtime.cdn_path || '/',
    rootPath: __dirname,
    entryPath: [path.join(__dirname, './src/index.tsx')],
    htmlPlugin: {
      filename: 'index.html',
      template: path.join(__dirname, './index.ejs'),
      favicon: path.join(__dirname, '/favicon.ico'),
      front_config:`<script>window.CODEMAOCONFIG = ${JSON.stringify(config.runtime)}</script>`,
    },
    definePlugin: {
      Debug: false,
    },
    dropConsole: config.runtime.env === 'prod',
    analyzePlugin: config.buildtime.analyze,
    devServer: {
      port: config.buildtime.originServer.port,
      https: config.buildtime.https,
      hot: config.buildtime.hot,
      disableHostCheck: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
  },
};

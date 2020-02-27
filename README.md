Login Saviour Web Extension

* to install:

1. run 'npm install'
2. add following to node_modules/react-scripts/config/webpack.config.js:

const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'node_modules/webextension-polyfill/dist/browser-polyfill.js'
      }
    ])
  ]
}

* to use with Firefox add to manifest.json:

"browser_specific_settings": {
  "gecko": {
    "id": "login@addon.com",
    "strict_min_version": "42.0"
  }
},

PIN to test the app: 1234

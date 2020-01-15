const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'client/js/index.js'),
  module: {
    rules: [
      {
        test: /\.m?js$/,
        include: [ path.resolve(__dirname, 'client/js') ], 
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-react',
              [
                '@babel/preset-env', 
                {
                  "targets": {
                    "node": "10"
                  }
                }
              ]
            ]
          }
        }
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'client/dist'),
    filename: 'bundle.js'
  }
}
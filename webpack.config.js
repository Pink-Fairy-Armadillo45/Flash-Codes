const path = require('path');

module.exports = (env) => {
  return {
    entry: './client/index.js',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js',
      publicPath: '/build/'
    },
    mode: env.NODE_ENV,
    module: {
      rules: [
        {
          test: /\.jsx?/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }
        },
        { 
          test: /.(css|scss)$/,
          use: [
            "style-loader","css-loader","sass-loader",
          ],
        },
      ],
    },
    devServer: {
      hot: true,
      proxy: {
        '/cards/**': {
          target: 'http://localhost:3000',
          secure: false,
        },
        '/user/**': {
          target: 'http://localhost:3000',
          secure: false,
        },
      },
      // static: {
      //   directory: path.join(__dirname, 'build'),
      //   publicPath: 'build/bundle.js'
      // },
      static: {
        directory: path.join(__dirname, '/'),
        publicPath: '/'
      },
      port: 8080,
      headers: { 'Access-Control-Allow-Origin': '*'},
    },
    resolve: {
      extensions: ['.js', '.jsx']
    }
  };
}
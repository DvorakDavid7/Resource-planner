const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    table: './js/table.js',
    edit: './js/edit.js',
    project_edit: './js/project_edit.js',
    projects: './js/projects.js',
    groups: './js/groups.js',
    finance: './js/finance.js',
    financeEdit: './js/financeEdit.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  /*
  module: {
      rules: [
          {
              test: /\.js$/,
              loader: 'babel-loader',
              query: 
              {
                  presets: [
                      [
                          "@babel/preset-env",
                          {
                          targets: { chrome: "58", ie: "10" }
                          }
                      ]
                  ]
              }
          }
      ]
  },
  */
  stats: {
      colors: true
  },
  devtool: 'source-map'
};

const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
      table: './js/table.js',
      edit: './js/edit.js',
      project_edit: './js/project_edit.js',
      projects: './js/projects.js',
    },
    output: {
      filename: '[name].js',
    },
};

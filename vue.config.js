const path = require('path');

module.exports = {
  'transpileDependencies': [
    'vuetify'
  ],
  'outputDir': path.resolve(__dirname, '../udo-project-api/templates'), // fix this
  'assetsDir': '../static'
};

/* put this code when build */
// 'outputDir': path.resolve(__dirname, '../udo-project-api/templates'), // fix this
// 'assetsDir': '../static'

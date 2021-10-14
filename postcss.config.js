/* eslint-disable import/no-commonjs */
module.exports = {
  plugins: [
    // require('postcss-custom-media')({
    //   importFrom: ['./src/styles/customResolutions.css'],
    // }),
    require('autoprefixer')({
      flexbox: 'no-2009',
    }),
    // require('postcss-custom-properties')({
    //   importFrom: ['./src/styles/customVariables.css'],
    //   // exportTo: './postcssVariables/variables.js',
    //   preserve: false,
    // }),
    require('postcss-flexbugs-fixes')(),
  ],
};

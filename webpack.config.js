module.exports = {
  context: __dirname,
  entry: "./main.js",
  output: {
    path: __dirname,
    filename: './bundle.js'
  },
  devtool: 'source-maps',
};

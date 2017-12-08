module.exports = {
  context: __dirname,
  entry: "./frontend/main.js",
  output: {
    path: __dirname,
    filename: './frontend/bundle.js'
  },
  devtool: 'source-maps',
};

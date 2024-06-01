const path = require('path')

module.exports = {
  entry: './src/index.tsx', // entry point is now a TypeScript file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/, // updated to handle TypeScript and React files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'], // added TypeScript and React extensions
  },
}

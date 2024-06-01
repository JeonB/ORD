const path = require('path')

module.exports = {
  mode: 'development', // Add this line
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/, // Add this block to handle CSS files
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      // Add this block to handle module resolution
      '@_compositions': path.resolve(__dirname, 'src/compositions'),
      '@_components/*': path.resolve(__dirname, 'src/components/*'),
      src: path.resolve(__dirname, 'src'),
    },
  },
}

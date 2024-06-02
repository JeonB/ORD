const path = require('path')
const million = require('million/compiler')
const MillionLint = require('@million/lint').default

module.exports = {
  webpack: {
    alias: {
      '@_compositions': path.resolve(__dirname, 'src/compositions/'),
      '@_components': path.resolve(__dirname, 'src/components'),
      src: path.resolve(__dirname, 'src'),
    },
    plugins: {
      add: [
        million.webpack({ auto: true }),
        MillionLint.webpack({ legacyHmr: true }),
      ],
    },
  },
}

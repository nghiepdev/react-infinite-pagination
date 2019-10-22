const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');

module.exports = {
  input: 'index.js',
  output: {
    file: 'bundle.js',
    format: 'umd',
    name: 'react-infinite-pagination',
    globals: {
      react: 'React',
      'prop-types': 'PropTypes',
    },
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
  external: ['react', 'prop-types'],
};

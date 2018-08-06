import minify from 'rollup-plugin-babel-minify'
import pkg from './package.json'

export default [
  {
    input: 'src/index.js',
    output: {
      name: 'bulmaToast',
      file: pkg.browser,
      format: 'umd',
    },
    plugins: [minify()],
  },
  {
    input: 'src/index.js',
    output: [{ file: pkg.main, format: 'cjs' }, { file: pkg.module, format: 'es' }],
    plugins: [minify()],
  },
]

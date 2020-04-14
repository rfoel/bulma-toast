import minify from 'rollup-plugin-babel-minify'
import babel from 'rollup-plugin-babel'
import pkg from './package.json'

const plugins = [
  babel({
    exclude: 'node_modules/**',
  }),
  minify({
    banner: `/*!\n * ${pkg.name} ${pkg.version} \n * (c) 2018-present ${pkg.author} \n * Released under the ${pkg.license} License.\n */`,
    bannerNewLine: true,
  }),
]

export default [
  {
    input: 'src/index.js',
    output: {
      name: 'bulmaToast',
      file: pkg.browser,
      format: 'umd',
    },
    plugins,
  },
  {
    input: 'src/index.js',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
    plugins,
  },
]

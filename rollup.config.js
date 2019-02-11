import minify from "rollup-plugin-babel-minify";
import pkg from "./package.json";

export default [
  {
    input: "src/index.js",
    output: {
      name: "bulmaToast",
      file: pkg.browser,
      format: "umd"
    },
    plugins: [
      minify({
        banner: `/*!\n * ${pkg.name} ${pkg.version} \n * (c) 2018-present ${
          pkg.author
          } \n * Released under the ${pkg.license} License.\n */`,
        bannerNewLine: true
      })
    ]
  },
  {
    input: "src/index.js",
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" }
    ],
    plugins: [
      minify({
        banner: `/*!\n * ${pkg.name} ${pkg.version} \n * (c) 2018-present ${
          pkg.author
          } \n * Released under the ${pkg.license} License.\n */`,
        bannerNewLine: true
      })
    ]
  }
];

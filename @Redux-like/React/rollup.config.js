import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
const pkg = require("./package.json");

export default {
  input: "./index.js",
  output: [
    {
      format: "cjs",
      file: pkg.main,
      name: "ReduxLike-main",
      sourcemap: true,
    },
  ],
  plugins: [
    external(),
    resolve(),
    babel({
      babelHelpers: "bundled",
      presets: ["@babel/preset-react"],
      exclude: "node_modules/**",
      extensions: [".js", ".jsx"],
    }),
    commonjs({
      include: "node_modules/**",
    }),
    terser(),
  ],
};

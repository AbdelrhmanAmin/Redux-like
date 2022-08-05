import babel from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "./index.js",
  output: {
    format: "umd",
    name: "ReduxLike",
    file: "./dist/redux-like.js",
    sourcemap: "inline",
  },
  plugins: [
    nodeResolve({
      extensions: [".js", ".jsx"],
    }),
    babel({
      presets: ["@babel/preset-react"],
    }),
    commonjs(),
  ],
};

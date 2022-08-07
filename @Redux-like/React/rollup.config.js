import babel from "@rollup/plugin-babel";
import external from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
// import { terser } from "rollup-plugin-terser";

export default {
  input: "./index.js",
  external: ["react", "react-dom"],
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
    },
    {
      file: "dist/index.es.js",
      format: "es",
      exports: "named",
    },
  ],
  plugins: [
    babel({
      presets: ["@babel/preset-react"],
      exclude: "node_modules/**",
      extensions: [".js", ".jsx"],
    }),
    external(),
    resolve({
      extensions: [".js", ".jsx"],
    }),
  ],
};

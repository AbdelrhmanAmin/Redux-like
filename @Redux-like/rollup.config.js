import babel from "rollup-plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";
const extensions = [".js", ".jsx"];

export default [
  {
    input: "./index.js",
    external: Object.keys(pkg.peerDependencies || {}).concat("react-dom"),
    output: {
      format: "umd",
      name: "Redux-like",
      file: "./dist/redux-like.js",
      globals: {
        react: "React",
        "react-dom": "ReactDOM",
      },
    },
    plugins: [
      nodeResolve({ extensions }),
      babel({
        exclude: "node_modules/**",
        presets: ["@babel/preset-react"],
        extensions,
      }),
      external(),
      terser(),
    ],
  },
];

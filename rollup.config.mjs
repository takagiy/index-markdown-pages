import { resolve } from "node:path";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import swc from "@rollup/plugin-swc";

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: "src/index.ts",
  output: {
    file: "dist/index.js",
    format: "esm",
    sourcemap: true,
  },
  plugins: [
    swc({
      swc: {
        jsc: {
          parser: {
            syntax: "typescript",
          },
          baseUrl: resolve("./src"),
          paths: {
            "@/*": ["./*"],
          },
        },
        module: {
          type: "es6",
        },
        sourceMaps: true,
        isModule: true,
        env: {
          targets: "node 20",
        },
      },
    }),
    nodeResolve({ preferBuiltins: true, extensions: [".js", ".ts"] }),
    commonjs(),
  ],
};

export default config;

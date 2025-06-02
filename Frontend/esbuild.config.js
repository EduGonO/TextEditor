// bundle Frontend/src/index.js → Frontend/public/bundle.js
const esbuild = require("esbuild");
const path = require("path");

esbuild.build({
  entryPoints: [path.resolve(__dirname, "src/index.js")],
  bundle: true,
  minify: false,
  sourcemap: false,
  outfile: path.resolve(__dirname, "public/bundle.js"),
  platform: "browser",
  target: ["chrome58", "safari11", "firefox57", "edge16"]
}).catch(() => process.exit(1));

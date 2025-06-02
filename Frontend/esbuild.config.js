// esbuild.config.js
const esbuild = require("esbuild");
const path = require("path");

esbuild.build({
  entryPoints: [path.resolve(__dirname, "src/index.js")],
  bundle: true,
  minify: false,
  sourcemap: false,
  outfile: path.resolve(__dirname, "public/bundle.js"),
  platform: "browser",
  // Change this ↓
  target: "es2020"
}).catch(() => process.exit(1));
const { promises } = require("fs");
const { resolve } = require("path");
const { build } = require("esbuild");
const { lessLoader } = require("esbuild-plugin-less");
const lessToJS = require("less-vars-to-js");

const customLessPath = resolve(__dirname, "../antd-custom.less");
promises.readFile(customLessPath).then((contents) => {
  build({
    entryPoints: [
      "source/index.ts"
    ],
    bundle: true,
    outfile: "dist/bundle.js",
    plugins: [
      lessLoader({
        filter: /\.less$/,
        javascriptEnabled: true,
        modifyVars: lessToJS(
          contents.toString()
        )
      })
    ]
  });
});



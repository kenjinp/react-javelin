const webpack = require("webpack");
const path = require("path");
const package = require("./package.json");

const config = {
  entry: {
    index: ["react-hot-loader/patch", path.join(__dirname, "src/index.ts")],
  },
  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
  },
};

module.exports = (env, argv) => {
  if (argv.mode === "production") {
    config.mode = "production";

    config.plugins.push(
      new webpack.BannerPlugin({
        banner: `${package.name} v.${package.version}`,
      })
    );

    config.output = {
      path: path.join(__dirname, "lib"),
      filename: "[name].js",
      libraryTarget: "umd",
    };

    config.externals = [
      {
        react: {
          commonjs: "react",
          commonjs2: "react",
          amd: "react",
          root: "React",
        },
      },
      "@javelin/ecs",
    ];
  }

  return config;
};

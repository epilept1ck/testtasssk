import { Configuration } from "webpack";
import { resolve } from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { TsConfigPathsPlugin } from "awesome-typescript-loader";

const basePath = resolve(__dirname, "src");

const config: Configuration = {
  target: "web",
  entry: `${basePath}/index.tsx`,
  mode: "development",
  resolve: {
    extensions: [".ts", ".tsx", ".js", "jsx", ".scss"],
    mainFiles: ["index"],
    plugins: [new TsConfigPathsPlugin()]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              camelCase: "dashes"
            }
          },
          "sass-loader"
        ]
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    port: 3000
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: `${__dirname}/favicon.png`,
      template: `${basePath}/index.html`
    })
  ]
};

export default config;

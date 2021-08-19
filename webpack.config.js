const path = require("path")
const webpack = require("webpack")

module.exports = {
    entry: ["@babel/polyfill", "/src/index.js"],
    output: {
        filename: "app.bundle.js",
        path: path.join(process.cwd(), "/dist")
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|mp3|svg)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        outputPath: "assets"
                    }
                }
            },
            {
                test: /\.css$/,
                exclude: "/node_modules",
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            modules: true
                        }
                    }
                ]
            },
            {
                test: /\.jsx?$/,
                exclude: "/node_modules",
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react"
                        ],
                        plugins: [
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            React: "react"
        })
    ],
    devtool: "source-map",
    devServer: {
        port: 8080,
        contentBase: "./dist"
    }
}
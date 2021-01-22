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
                test: /\.(png|jpe?g|mp3)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        outputPath: "images"
                    }
                }
            },
            {
                test: /\.css$/,
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
        port: 3000,
        contentBase: "./dist"
    }
}
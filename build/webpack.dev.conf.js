const path = require("path")
const webpack = require("webpack")
const baseConfig = require("./webpack.base.conf")
const merge = require("webpack-merge")

const HtmlWebpackPlugin = require("html-webpack-plugin")
const notifier = require("node-notifier")
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin")

const resolve = dir => path.join(__dirname, "..", dir)

module.exports = merge(baseConfig, {

    mode: "development",

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    "vue-style-loader",
                    "css-loader",
                    "postcss-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            indentedSyntax: false
                        }
                    }
                ]
            }
        ]
    },

    devServer: {
        port: 9000,
        host: "localhost",
        compress: true,
        open: true,
        hot: true,
        inline: true,
        overlay: true,
        publicPath: "/"
    },

    devtool: "cheap-module-eval-source-map",

    plugins: [

        new webpack.HotModuleReplacementPlugin(),

        new webpack.NamedModulesPlugin(),

        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "index.html",
            inject: true
        }),

        new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
                messages: ["Your application is running here: http://localhost:9000"]
            },
            onErrors: () => {
                return (severity, errors) => {
                    if (severity !== "error") return

                    const error = errors[0]
                    const filename = error.file && error.file.split("!").pop()

                    notifier.notify({
                        title: resolve("package.json"),
                        message: severity + ": " + error.name,
                        subtitle: filename || ""
                    })
                }
            }
        })

    ]
})

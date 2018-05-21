const path = require("path")
const baseConfig = require("./webpack.base.conf")
const merge = require("webpack-merge")
const webpack = require("webpack")

const HtmlWebpackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin")

const resolve = dir => path.join(__dirname, "..", dir)

module.exports = merge(baseConfig, {

    mode: "production",

    output: {
        path: resolve("dist"),
        filename: "static/js/[name].[chunkhash].js",
        chunkFilename: "static/js/[id].[chunkhash].js"
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: "vue-style-loader",
                    use: [ {
                        loader: "css-loader",
                        options: {
                            // modules: true
                        }
                    }, "postcss-loader", "sass-loader"]
                })
            }
        ]
    },

    plugins: [

        new ExtractTextWebpackPlugin({
            filename: "static/css/[name].[hash:7].css",

            allChunks: true
        }),

        // keep module.id stable when vendor modules does not change
        new webpack.HashedModuleIdsPlugin(),

        new HtmlWebpackPlugin({
            filename: resolve("dist/index.html"),
            template: "index.html",
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        }),

        new CleanWebpackPlugin([
            resolve("dist/*.*")
        ])
    ]
})

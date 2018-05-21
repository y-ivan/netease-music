const path = require("path")

const VueLoaderPlugin = require("vue-loader/lib/plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")

const resolve = dir => path.join(__dirname, "..", dir)

module.exports = {
    context: resolve("/"),
    entry: resolve("src/main.js"),

    output: {
        path: resolve("dist/"),
        publicPath: "/",
        filename: "build.js?[hash:8]"
    },

    resolve: {
        extensions: [".js", ".vue", ".scss", ".css", ".json"],
        alias: {
            "vue$": "vue/dist/vue.esm.js",
            "@": resolve("src")
        }
    },

    module: {
        rules: [
            {
                test: /\.(vue|js|jsx)$/,
                use: ["eslint-loader"],
                exclude: /node_modules/,
                enforce: "pre"
            },
            {
                test: /\.vue$/,
                use: ["vue-loader"]
            },
            {
                test: /\.js?$/,
                loader: "babel-loader",
                include: [resolve("src"), resolve("test"), resolve("node_modules/webpack-dev-server/client")]
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: "static/img/[name].[hash:7].[ext]"
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: "static/media/[name].[hash:7].[ext]"
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: "static/fonts/[name].[hash:7].[ext]"
                }
            }

        ]
    },

    plugins: [
        new VueLoaderPlugin(),

        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: resolve("static"),
                to: "static",
                ignore: [".*"]
            }
        ])
    ]
}

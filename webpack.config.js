const path = require("path");
const webpack = require("webpack");


var SuppressChunksPlugin = require("suppress-chunks-webpack-plugin").default;
var LiveReloadPlugin = require("webpack-livereload-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractHTML = new ExtractTextPlugin("[name].html");
module.exports = {
    entry: {
        index: "./html/index.html",
        details: "./html/podcast-details.html",
        first: "./js/first.js" },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "generate")
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "file-loader",
                        options: { name: "stylesheets/[name]-less.css" }
                    },
                    {
                        loader: "extract-loader",
                        options: { publicPath: "../" }
                    },
                    { loader: "css-loader" },
                    { loader: "less-loader" }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "file-loader",
                        options: { name: "stylesheets/[name]-css.css" }
                    },
                    {
                        loader: "extract-loader",
                        options: { publicPath: "../" }
                    },
                    { loader: "css-loader" }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "file-loader",
                        options: { name: "stylesheets/[name]-sass.css" }
                    },
                    {
                        loader: "extract-loader",
                        options: { publicPath: "../" }
                    },
                    { loader: "css-loader" },
                    { loader: "sass-loader" }
                ]
            },
            {
                test: /\.styl$/,
                use: [
                    {
                        loader: "file-loader",
                        options: { name: "stylesheets/[name]-styl.css" }
                    },
                    {
                        loader: "extract-loader",
                        options: { publicPath: "../" }
                    },
                    { loader: "css-loader" },
                    { loader: "stylus-loader" }
                ]
            },
            {
                test: /\.(gif|png|jpe?g)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: { name: "[path][name].[ext]" }
                    },
                    {
                        loader: "image-webpack-loader",
                        options: {
                            gifsicle: { interlaced: false },
                            optipng: { optimizationLevel: 7 },
                            pngquant: { quality: "65-90", speed: 4 },
                            mozjpeg: { progressive: true, quality: 90 }
                        }
                    }
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: { name: "[path][name].[ext]" }
                    }
                ]
            },
            {
                test: /\.(html)$/,
                use: extractHTML.extract({
                    use: [
                        {
                            loader: "html-loader",
                            options: {
                                ignoreCustomFragments: [/\{\{.*?}}/],
                                root: path.resolve(__dirname, "assets"),
                                attrs: ["img:src", "link:href"],
                                interpolate: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                }
            }
        ]
    },

    watch: true,
    plugins: [
        extractHTML,
        new SuppressChunksPlugin(["index"], { filter: /\.js$/ }),
        new LiveReloadPlugin(),
         new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default'],
        // In case you imported plugins individually, you must also require them here:
        Util: "exports-loader?Util!bootstrap/js/dist/util",
        Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
    })

    ]
};

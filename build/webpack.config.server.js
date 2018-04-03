const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    target: "node",
    entry: {
        app: path.join(__dirname, '../client/server-entry.js')
    },
    output: {
        filename: 'server.js',
        path: path.join(__dirname, '../dist'),
        publicPath: "/pubilc",
        libraryTarget: "commonjs2"
    },
    module: {
        rules: [
            {
                test:/\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: [
                    path.join(__dirname, '../node_modules')
                ]
            },
        ]
    }
}
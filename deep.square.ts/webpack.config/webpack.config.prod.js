const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (webPackDirname) => {
    return {
        mode: 'production',
        entry: './src/Main.ts',
        module: {
            rules: [{
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }, {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }, {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
			}, {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
				use: [
                    'ts-loader'
                ],
            }]
        },
        resolve: {
            extensions: [".tsx", ".ts", ".jsx", ".js"],
        },
        output: {
            filename: 'index.js',
            path: path.resolve(webPackDirname, 'dist')
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                title: 'MVC.SQUARE'
            })
        ]
    };
};
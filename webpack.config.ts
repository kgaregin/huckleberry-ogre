const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './src/client/index.tsx',
    output: {
        path: path.resolve(__dirname, 'src/dist'),
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    devServer: {
        contentBase: './',
        port: 8080,
        hot: true
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [{
            enforce: 'pre',
            test: /\.ts|\.tsx$/,
            loader: 'source-map-loader',
            include: path.resolve(__dirname, 'src/client')
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.(eot|ttf|woff|woff2)$/,
            loader: 'url-loader',
            options: {
                limit: 10000
            }
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file-loader',
            options: {
                name: '[name]_[hash].[ext]'
            }
        }, {
            test: /\.ts|\.tsx$/,
            loader: 'awesome-typescript-loader',
            options: {
                configFileName: path.resolve(__dirname, 'src/client/tsconfig.json')
            },
            include: path.resolve(__dirname, 'src/client'),
            exclude: /node_modules/
        }]
    },
    plugins: [
        new CleanWebpackPlugin(['src/dist']),
        new HtmlWebpackPlugin({
            title: 'Huckleberry Ogre welcomes you, stranger!',
            template: 'index_template.ejs'
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    }
};
import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import MinifyPlugin  from 'babel-minify-webpack-plugin';

const tsFrontDirs = [
    path.resolve(__dirname, 'src/client'),
    path.resolve(__dirname, 'src/server/db/models.ts'),
    path.resolve(__dirname, 'src/config.ts')
];

const webpackConfiguration: webpack.Configuration = {
    stats: {
        colors: true
    },
    mode: 'production',
    entry: './src/client/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    resolve: {
        //ToDo: investigate, why this is not enough to resolve imports that are relative to src directory
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    module: {
        rules: [{
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
            include: tsFrontDirs,
            exclude: /node_modules/
        }]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Huckleberry Ogre welcomes you, stranger!',
            template: 'index_template.ejs'
        }),
        new MinifyPlugin()
    ]
};

module.exports = webpackConfiguration;
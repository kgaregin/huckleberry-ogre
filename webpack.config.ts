const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/frontSource/index.tsx',
    output: {
        path: path.resolve(__dirname, 'src/dist'),
        filename: 'bundle.js'
    },
    devtool: "source-map",
    devServer: {
        contentBase: './src/dist',
        port: 8080,
        hot: true
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [{
            enforce: "pre",
            test: /\.ts|\.tsx$/,
            loader: "source-map-loader",
            include: path.resolve(__dirname, 'src/frontSource')
        }, {
            test: /\.ts|\.tsx$/,
            loader: "awesome-typescript-loader",
            include: path.resolve(__dirname, 'src/frontSource')
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
};
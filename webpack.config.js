const path = require('path');

module.exports = {
    entry: './src/frontSource/index.tsx',
    output: {
        path: path.resolve(__dirname, 'src/dist'),
        filename: 'bundle.js'
    },
    devtool: "source-map",
    devServer: {
        contentBase: './src/dist',
        port: 8080
    },
    module: {
        rules: [{
            enforce: "pre",
            test: /\.ts|\.tsx$/,
            loader: "source-map-loader",
            include: __dirname
        }, {
            test: /\.ts|\.tsx$/,
            loader: "awesome-typescript-loader",
            include: __dirname
        }]
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
};
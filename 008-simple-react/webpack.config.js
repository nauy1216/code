const path = require('path')
module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        app: './src/index.jsx'
    },
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js(x)?$/,
                use: [
                    'babel-loader'
                ]
            }
        ]
    }
}
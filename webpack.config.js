module.exports = {
    mode: 'development',

    entry: './src/main.js',
    output: {
        filename: 'main.js',
        path: __dirname + '/dist/'
    },

    devtool: 'source-map',
    devServer: {
        contentBase: './src',
        publicPath: '/dist'
    },

    module: {
        rules: [
            {
                test: /.js$/,
                loader: 'babel-loader',
                options: {
                    preset:['es2015', 'react']
                }
            }
        ]
    }
};
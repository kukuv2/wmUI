/*
Dll打包以后是独立存在的，只要其包含的库没有增减、升级，hash也不会变化，因此线上的dll代码不需要随着版本发布频繁更新。
App部分代码修改后，只需要编译app部分的代码，dll部分，只要包含的库没有增减、升级，就不需要重新打包。这样也大大提高了每次编译的速度。
假设你有多个项目，使用了相同的一些依赖库，它们就可以共用一个dll。
*/
require('shelljs/global')
const webpack = require('webpack');
const config = require('./index')
var utils = require('../build/utils')
rm('-rf', config.build.assetsRoot)
const vendors = [
    'vue',
    'vuedraggable',
    'lodash',
    '../src/styles/index.less',
    'element-ui',
    'element-ui/lib/theme-default/index.css'
];

var exports = {
    output: {
        path: config.project.dirPath + '/static',
        filename: '[name].[chunkhash].js',
        library: '[name]_[chunkhash]',
    },
    entry: {
        vendor: vendors,
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.build.env
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DllPlugin({
            path: config.project.dirPath + '/static/vendor.manifest.json', //mainfest.json库的索引编号
            name: '[name]_[chunkhash]',
            context: config.project.dirPath, //匹配mainfest中库的路径
        }),
    ],
    module: {
        loaders: utils.styleLoaders({sourceMap: config.build.productionSourceMap}),
    },

};
exports.module.loaders.push({
    test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
    loader: 'url',
    query: {
        limit: 10000,
        name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
    }
})
module.exports = exports
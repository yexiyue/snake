const path=require('path')
const htmlWebpackPlugin=require('html-webpack-plugin')
const {CleanWebpackPlugin}=require('clean-webpack-plugin');
const MiniCssExtractPlugin=require('mini-css-extract-plugin')
module.exports={
    entry:'./src/index.ts',
    output:{
        path:path.join(__dirname,'dist'),
        filename:'./app.js'
    },
    mode:'development',
    module:{
        rules:[
            {
                test:/\.ts$/,
                use:[
                    {
                        loader:'babel-loader',
                        options:{
                            presets: [
                                [
                                    "@babel/preset-env",
                                    {
                                        "targets":{
                                        "chrome": "58",
                                        "ie": "11"
                                        },
                                        "corejs":"3",
                                        "useBuiltIns": "usage"
                                    }
                                ]
                            ]
                        }
                    },
                    {loader:'ts-loader'}
                ]
            },
            {
                test:/\.less$/,
                use:[
                    {loader:MiniCssExtractPlugin.loader,options:{publicPath:'./dist/',}},
                    'css-loader',
                    {
                        // 还需要在package.json中定义browserslist
                        loader:'postcss-loader',
                        options:{
                            postcssOptions:{
                            plugins:[require('postcss-preset-env')()]
                            }
                        }
                    },
                    'less-loader'
                ]
            },
        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            template:'./src/index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename:'./index.css'
        })
    ],
    devServer:{
        static:'./dist',
        open:true,
        port:3000,
    }
}
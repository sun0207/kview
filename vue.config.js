const path = require('path');
module.exports = {
    publicPath:'./',
    pages:{
        index:{
            entry:"examples/main.ts",
            template:"public/index.html",
            filename:'index.html'
        }
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('#', path.resolve('examples'))
            .set('~', path.resolve('packages'))
            .set('@', path.resolve('components'));
        
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
              options.compilerOptions.preserveWhitespace = true
              return options
            })

        config.module
            .rule('eslint')
            .exclude.add(path.resolve('lib'))
            .end()
            .exclude.add(path.resolve('examples/docs'))
            .end();

        config.module
            .rule('js')
            .include.add(/examples/)
            .end()
            .include.add(/packages/)
            .end()
            .use('babel')
            .loader('babel-loader')
            .tap(Option => {
                return Option
            })
    }
}
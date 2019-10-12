const { resolve, join } = require('path');


class EntryOptionWebpackPlugin {
    apply(compiler) {
        compiler.hooks.entryOptions.tap('Plugin', (option) => {
            console.log('EntryOptionWebpackPlugin');
        });
    }
}

class AfterPlugins {
    apply(compiler) {
        compiler.hooks.afterPlugins.tap('Plugin', (option) => {
            console.log('AfterPlugins');
        });
    }
}


class RunPlugin {
    apply(compiler) {
        compiler.hooks.run.tap('Plugin', (option) => {
            console.log('RunPlugin');
        });
    }
}


class CompileWebpackPlugin {
    apply(compiler) {
        compiler.hooks.beforeCompile.tap('Plugin', (option) => {
            console.log('CompileWebpackPlugin');
        });
    }
}


class AfterCompileWebpackPlugin {
    apply(compiler) {
        compiler.hooks.afterCompile.tap('Plugin', (option) => {
            console.log('AfterCompileWebpackPlugin');
        });
    }
}
class EmitWebpackPlugin {
    apply(compiler) {
        compiler.hooks.emit.tap('Plugin', () => {
            console.log('EmitWebpackPlugin');
        });
    }
}
class DoneWebpackPlugin {
    apply(compiler) {
        compiler.hooks.done.tap('Plugin', (option) => {
            console.log('DoneWebpackPlugin');
        });
    }
}
module.exports = {
    mode: 'development',
    entry: '/src/index.js',
    output: {
        path: resolve('dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ['style-loader', 'less-loader']
            }
        ]
    },
    plugins: [
        new EntryOptionWebpackPlugin(),
        new AfterPlugins(),
        new EntryOptionWebpackPlugin(),
        new RunPlugin(),
        new CompileWebpackPlugin(),
        new AfterCompileWebpackPlugin(),
        new EmitWebpackPlugin(),
        new DoneWebpackPlugin(),
    ]
}


#! /usr/bin/env node

let fs = require('fs');
let { join, resolve } = require('path');
let Compiler = require('../lib/Compiler');
//获取当前路径，当前的工作目录
//D:\vipcode\project\201805\usewebpack
let root = process.cwd();
let options = require(join(root, 'webpack.config.js'));
let compiler = new Compiler(options);
compiler.hooks.entryOptions.call();
let { plugins } = options;
plugins.forEach(plugin => {
    plugin.apply(compiler);
});
compiler.hooks.afterPlugins.call();
compiler.run();



class InlinePlugin {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        compiler.hooks.compilation.tap('InlinePlugin', (compilation) => {
            /**
             * htmlData { head:[ { tagName: 'link',
                          selfClosingTag: false,
                           voidTag: true,
                        attributes:{href:'xxx'} } ],
                 body: [ { tagName: 'script', closeTag: true, attributes: [Object] } ],
             */
            compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync('InlinePlugin', (htmlData, callback) => {
                this.processTags(compilation, htmlData);
                callback(null, htmlData);
            });
        });
    }
    processTags(compilation, htmlData) {
        htmlData.head = htmlData.head.map(tag => this.processTag(compilation, tag));
        htmlData.body = htmlData.body.map(tag => this.processTag(compilation, tag));
    }
    processTag(compilation, tag) {
        let assetUrl;
        if (tag.tagName == 'link' && this.options.test.test(tag.attributes.href)) {
            assetUrl = tag.attributes.href;
            tag = {
                tagName: 'style',
                closeTag: true,
                attributes: { type: 'text/css' }
            }
        } else if (tag.tagName == 'script' && this.options.test.test(tag.attributes.src)) {
            assetUrl = tag.attributes.src;
            tag = {
                tagName: 'script',
                closeTag: true,
                attributes: { type: 'text/javascript' }
            }
        }
        if (assetUrl) {
            tag.innerHTML = compilation.assets[assetUrl].source();
            delete compilation.assets[assetUrl];
        }
        return tag;
    }
}
module.exports = InlinePlugin;
# Wix Rich Content Editor

#### A super charged rich text editor with an extensible plugin system.

## Bootstrap
1. `cd rich-content`
2. `npm install` - installs `lerna` as well as other common dev dependecies
3. `lerna bootstrap` - links local dependencies
4. Build the modules by running one of the following:
    1. `lerna run --parallel build:dev` - build once
    2. `lerna run --parallel watch` - rebuild on changes


## Modules


[rich-content-editor](https://github.com/wix-incubator/rich-content/tree/master/rich-content-editor) is the rich content editor React Component.
[rich-content-editor-example](https://github.com/wix-incubator/rich-content/tree/master/rich-content-editor-example) to see how to consume the Component as an editor.
[rich-content-viewer-example](https://github.com/wix-incubator/rich-content/tree/master/rich-content-viewer-example) to see how to consume the Component as a viewer.
[rich-content-editor-tpa](https://github.com/wix-incubator/rich-content/tree/master/rich-content-editor-tpa) to see how to consume the Component as a Wix Third Party Application.
[rich-content-common](https://github.com/wix-incubator/rich-content/tree/master/rich-content-common) is a shared library utilized by the rest of the modules.
[config](https://github.com/wix-incubator/rich-content/tree/master/config) build config for rich-content-common and all plugins.

##### Plugins

[rich-content-plugin-link](https://github.com/wix-incubator/rich-content/tree/master/rich-content-plugin-link) convert plain text URLs into `<a>` tags.
[rich-content-plugin-hashtag](https://github.com/wix-incubator/rich-content/tree/master/rich-content-plugin-hashtag) convert plain text #hastags into dynamic elements.
[rich-content-plugin-emoji](https://github.com/wix-incubator/rich-content/tree/master/rich-content-plugin-emoji) add emojis to your content.
[rich-content-plugin-image](https://github.com/wix-incubator/rich-content/tree/master/rich-content-plugin-image) add images to your content.
[rich-content-plugin-video](https://github.com/wix-incubator/rich-content/tree/master/rich-content-plugin-video) add videos to your content.
[rich-content-plugin-gallery](https://github.com/wix-incubator/rich-content/tree/master/rich-content-plugin-gallery) add pro galleries to your content!!!
[rich-content-plugin-html](https://github.com/wix-incubator/rich-content/tree/master/rich-content-plugin-html) embed html code or sites in your content.
[rich-content-plugin-divider](https://github.com/wix-incubator/rich-content/tree/master/rich-content-plugin-divider) add dividers to your content.

"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decorators = exports.config = exports.typeMappers = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _theme = _interopRequireDefault(require("../theme/theme"));

var _viewer = require("wix-rich-content-plugin-video/dist/cjs/viewer");

var _viewer2 = require("wix-rich-content-plugin-divider/dist/cjs/viewer");

var _viewer3 = require("wix-rich-content-plugin-html/dist/cjs/viewer");

var _viewer4 = require("wix-rich-content-plugin-sound-cloud/dist/cjs/viewer");

var _viewer5 = require("wix-rich-content-plugin-link/dist/cjs/viewer");

var _viewer6 = require("wix-rich-content-plugin-image/dist/cjs/viewer");

var _viewer7 = require("wix-rich-content-plugin-map/dist/cjs/viewer");

var _wixRichContentPluginHashtag = require("wix-rich-content-plugin-hashtag");

var _wixRichContentPluginHeadersMarkdown = require("wix-rich-content-plugin-headers-markdown");

var _viewer8 = require("wix-rich-content-plugin-code-block/dist/cjs/viewer");

var _viewer9 = require("wix-rich-content-plugin-mentions/dist/cjs/viewer");

var _viewer10 = require("wix-rich-content-plugin-file-upload/dist/cjs/viewer");

var _wixRichContentPluginTextColor = require("wix-rich-content-plugin-text-color");

var _textColorStyleFn = require("../text-color-style-fn");

var _config;

var linkPluginSettings = {
  onClick: function onClick(event, url) {
    return console.log('link clicked!', url);
  }
};
var mentionsPluginSettings = {
  onMentionClick: function onMentionClick(mention) {
    return console.log('mention clicked!', mention);
  },
  getMentionLink: function getMentionLink() {
    return '/link/to/mention';
  }
};

var onHashTagClick = function onHashTagClick(event, text) {
  event.preventDefault();
  console.log("'".concat(text, "' hashtag clicked!"));
};

var typeMappers = [_viewer.videoTypeMapper, _viewer2.dividerTypeMapper, _viewer3.htmlTypeMapper, _viewer5.linkTypeMapper, _viewer4.soundCloudTypeMapper, _viewer9.mentionsTypeMapper, _viewer6.imageTypeMapper, _viewer7.mapTypeMapper, _viewer10.fileUploadTypeMapper];
exports.typeMappers = typeMappers;
var themeColors = {
  color1: '#ffffff',
  color2: '#303030',
  color3: '#3a54b4',
  color4: '#bfad80',
  color5: '#bf695c',
  color6: '#f7f7f7',
  color7: '#000000',
  color8: '#9a87ce'
};
var config = (_config = {}, (0, _defineProperty2.default)(_config, _wixRichContentPluginHeadersMarkdown.HEADERS_MARKDOWN_TYPE, {
  hideMarkdown: true
}), (0, _defineProperty2.default)(_config, _viewer3.HTML_TYPE, {
  htmlIframeSrc: 'http://localhost:3000/static/html-plugin-embed.html'
}), (0, _defineProperty2.default)(_config, _viewer5.LINK_TYPE, linkPluginSettings), (0, _defineProperty2.default)(_config, _viewer9.MENTION_TYPE, mentionsPluginSettings), (0, _defineProperty2.default)(_config, _wixRichContentPluginTextColor.TEXT_COLOR_TYPE, {
  styleSelectionPredicate: (0, _textColorStyleFn.getStyleSelectionPredicate)(themeColors),
  customStyleFn: (0, _textColorStyleFn.getViewerCustomStyleFn)(themeColors)
}), _config);
exports.config = config;
var decorators = [{
  strategy: _viewer5.LinkParseStrategy,
  component: function component(_ref) {
    var children = _ref.children,
        decoratedText = _ref.decoratedText,
        rel = _ref.rel,
        target = _ref.target;
    return React.createElement(_viewer5.LinkViewer, {
      componentData: {
        rel: rel,
        target: target,
        url: decoratedText
      },
      anchorTarget: anchorTarget,
      relValue: relValue,
      settings: linkPluginSettings
    }, children);
  }
}, {
  strategy: _wixRichContentPluginHashtag.Strategy,
  component: function component(_ref2) {
    var children = _ref2.children,
        decoratedText = _ref2.decoratedText;
    return React.createElement(_wixRichContentPluginHashtag.Component, {
      theme: _theme.default,
      onClick: onHashTagClick,
      createHref: function createHref(decoratedText) {
        return "/search/posts?query=".concat(encodeURIComponent('#')).concat(decoratedText);
      },
      decoratedText: decoratedText
    }, children);
  }
}, new _viewer8.CodeBlockDecorator({
  theme: _theme.default
}), (0, _wixRichContentPluginHeadersMarkdown.createHeadersMarkdownDecorator)(config), (0, _wixRichContentPluginTextColor.createTextColorDecorator)(config)];
exports.decorators = decorators;
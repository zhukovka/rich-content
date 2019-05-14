"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = exports.editorPlugins = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _wixRichContentPluginLink = require("wix-rich-content-plugin-link");

var _wixRichContentPluginHashtag = require("wix-rich-content-plugin-hashtag");

var _wixRichContentPluginImage = require("wix-rich-content-plugin-image");

var _wixRichContentPluginVideo = require("wix-rich-content-plugin-video");

var _wixRichContentPluginHtml = require("wix-rich-content-plugin-html");

var _wixRichContentPluginDivider = require("wix-rich-content-plugin-divider");

var _wixRichContentPluginMentions = require("wix-rich-content-plugin-mentions");

var _wixRichContentPluginCodeBlock = require("wix-rich-content-plugin-code-block");

var _wixRichContentPluginSoundCloud = require("wix-rich-content-plugin-sound-cloud");

var _wixRichContentPluginGiphy = require("wix-rich-content-plugin-giphy");

var _wixRichContentPluginHeadersMarkdown = require("wix-rich-content-plugin-headers-markdown");

var _wixRichContentPluginMap = require("wix-rich-content-plugin-map");

var _wixRichContentPluginFileUpload = require("wix-rich-content-plugin-file-upload");

var _wixRichContentPluginTextColor = require("wix-rich-content-plugin-text-color");

var _react = _interopRequireDefault(require("react"));

var _reactHighlightWords = _interopRequireDefault(require("react-highlight-words"));

var _casualBrowserify = _interopRequireDefault(require("casual-browserify"));

var _textColorStyleFn = require("../text-color-style-fn");

var _config;

// import { TOOLBARS, BUTTONS, DISPLAY_MODE } from 'wix-rich-content-common';
// import InlineToolbarDecoration from './Components/InlineToolbarDecoration';
// import StaticToolbarDecoration from './Components/StaticToolbarDecoration';
// import SideToolbarDecoration from './Components/SideToolbarDecoration';
// import PluginToolbarDecoration from './Components/PluginToolbarDecoration';
var editorPlugins = [_wixRichContentPluginImage.createImagePlugin, _wixRichContentPluginVideo.createVideoPlugin, _wixRichContentPluginHtml.createHtmlPlugin, _wixRichContentPluginDivider.createDividerPlugin, // createExternalEmojiPlugin,
_wixRichContentPluginLink.createLinkPlugin, _wixRichContentPluginHashtag.createHashtagPlugin, _wixRichContentPluginMentions.createExternalMentionsPlugin, _wixRichContentPluginCodeBlock.createCodeBlockPlugin, _wixRichContentPluginSoundCloud.createSoundCloudPlugin, _wixRichContentPluginGiphy.createGiphyPlugin, _wixRichContentPluginHeadersMarkdown.createHeadersMarkdownPlugin, _wixRichContentPluginMap.createMapPlugin, _wixRichContentPluginFileUpload.createFileUploadPlugin, _wixRichContentPluginTextColor.createTextColorPlugin];
exports.editorPlugins = editorPlugins;
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

var getLinkPanelDropDownConfig = function getLinkPanelDropDownConfig() {
  var getItems = function getItems() {
    _casualBrowserify.default.define('item', function () {
      return {
        value: _casualBrowserify.default.url,
        label: _casualBrowserify.default.catch_phrase,
        date: _casualBrowserify.default.date('DD/MM/YY')
      };
    });

    var items = [];
    var amount = 1000;

    for (var i = 0; i < amount; ++i) {
      items.push(_casualBrowserify.default.item);
    }

    return items;
  };

  var wordHighlighter = function wordHighlighter(textToHighlight, searchWords) {
    return _react.default.createElement(_reactHighlightWords.default, {
      searchWords: [searchWords],
      textToHighlight: textToHighlight,
      highlightTag: function highlightTag(_ref) {
        var children = _ref.children;
        return _react.default.createElement("strong", {
          className: "highlighted-text"
        }, children);
      }
    });
  };

  var items = getItems();
  return {
    // isOpen: true,
    getItems: function getItems() {
      return items;
    },
    itemHeight: 40,
    itemToString: function itemToString(item) {
      return item.value;
    },
    formatMenuItem: function formatMenuItem(item, input) {
      return _react.default.createElement("div", {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          padding: '10px'
        }
      }, _react.default.createElement("span", {
        style: {
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          paddingRight: '10px'
        }
      }, wordHighlighter(item.label, input)), _react.default.createElement("span", null, item.date));
    }
  };
};

var userColors = [];
var uiSettings = {
  themeColors: themeColors,
  linkPanel: {
    blankTargetToggleVisibilityFn: function blankTargetToggleVisibilityFn() {
      return true;
    },
    nofollowRelToggleVisibilityFn: function nofollowRelToggleVisibilityFn() {
      return true;
    },
    dropDown: getLinkPanelDropDownConfig()
  }
};
var config = (_config = {}, (0, _defineProperty2.default)(_config, _wixRichContentPluginHashtag.HASHTAG_TYPE, {
  createHref: function createHref(decoratedText) {
    return "/search/posts?query=".concat(encodeURIComponent('#')).concat(decoratedText);
  },
  onClick: function onClick(event, text) {
    event.preventDefault();
    console.log("'".concat(text, "' hashtag clicked!"));
  }
}), (0, _defineProperty2.default)(_config, _wixRichContentPluginHtml.HTML_TYPE, {
  htmlIframeSrc: 'http://localhost:3000/static/html-plugin-embed.html',
  minWidth: 35,
  maxWidth: 740,
  height: 250,
  width: 740,
  minHeight: 50,
  maxHeight: 350
}), (0, _defineProperty2.default)(_config, _wixRichContentPluginMentions.EXTERNAL_MENTIONS_TYPE, {
  repositionSuggestions: true,
  onMentionClick: function onMentionClick(mention) {
    return console.log({
      mention: mention
    });
  },
  getMentions: function getMentions(searchQuery) {
    return new Promise(function (resolve) {
      return setTimeout(function () {
        return resolve([{
          name: searchQuery,
          slug: searchQuery
        }, {
          name: 'Test One',
          slug: 'testone'
        }, {
          name: 'Test One.1',
          slug: 'testone1'
        }, {
          name: 'Test One.2',
          slug: 'testone2'
        }, {
          name: 'Test One.3',
          slug: 'testone3'
        }, {
          name: 'Test One.4',
          slug: 'testone4'
        }, {
          name: 'Test Two',
          slug: 'testwo',
          avatar: 'https://via.placeholder.com/100x100?text=Image=50'
        }]);
      }, 250);
    });
  }
}), (0, _defineProperty2.default)(_config, _wixRichContentPluginLink.LINK_TYPE, {
  onClick: function onClick(event, url) {
    return console.log('link clicked!', url);
  } // autoLink: false

}), (0, _defineProperty2.default)(_config, _wixRichContentPluginCodeBlock.CODE_BLOCK_TYPE, {}), (0, _defineProperty2.default)(_config, _wixRichContentPluginDivider.DIVIDER_TYPE, {}), (0, _defineProperty2.default)(_config, _wixRichContentPluginVideo.VIDEO_TYPE, {
  toolbar: {
    hidden: []
  },
  //Here you can call your custom video upload functionality (comment function to disable custom upload)
  handleFileSelection: function handleFileSelection(updateEntity, removeEntity) {
    console.log('consumer wants to upload custom video');
    var videoWithAbsoluteUrl = {
      url: 'http://mirrors.standaloneinstaller.com/video-sample/jellyfish-25-mbps-hd-hevc.mp4'
    };
    var videoWithRelativeUrl = {
      pathname: 'video/441c23_84f5c058e5e4479ab9e626cd5560a21b/file',
      thumbnail: {
        pathname: 'media/441c23_84f5c058e5e4479ab9e626cd5560a21bf000.jpg',
        height: 1080,
        width: 1920
      }
    }; // You can provide either absolute or relative URL.
    // If relative URL is provided, a function 'getVideoUrl' will be invoked to form a full URL.

    var videoToUpload = videoWithAbsoluteUrl;
    setTimeout(function () {
      updateEntity({
        data: videoToUpload
      }); //updateEntity({ error: { msg: 'Upload Failed' } });

      console.log('consumer uploaded ', videoToUpload);
    }, 500);
  },
  enableCustomUploadOnMobile: true,
  // Function is invoked when rendering video which has relative URL.
  // You should take the pathname and form a full URL.
  getVideoUrl: function getVideoUrl(src) {
    return "https://video.wixstatic.com/".concat(src.pathname);
  }
}), (0, _defineProperty2.default)(_config, _wixRichContentPluginGiphy.GIPHY_TYPE, {
  giphySdkApiKey: process.env.GIPHY_API_KEY
}), (0, _defineProperty2.default)(_config, _wixRichContentPluginMap.MAP_TYPE, {
  googleMapApiKey: process.env.GOOGLE_MAPS_API_KEY,
  minWidth: 100,
  maxWidth: 740,
  minHeight: 100,
  maxHeight: 1000,
  mapSettings: {
    address: 'Wix HQ, Nemal Tel Aviv Street, Tel Aviv-Yafo, Israel',
    locationDisplayName: 'Wix HQ, Nemal Tel Aviv Street, Tel Aviv-Yafo, Israel',
    lat: 32.097235,
    lng: 34.77427,
    zoom: 18,
    mode: 'roadmap',
    isMarkerShown: true,
    isZoomControlShown: true,
    isStreetViewControlShown: true,
    isDraggingAllowed: true
  }
}), (0, _defineProperty2.default)(_config, _wixRichContentPluginFileUpload.FILE_UPLOAD_TYPE, {
  accept: '*',
  onFileSelected: function onFileSelected(file, updateEntity) {
    var name = file.name;
    var filenameParts = name.split('.');
    var type = filenameParts[filenameParts.length - 1];
    var data = {
      name: name,
      type: type,
      url: 'http://file-examples.com/wp-content/uploads/2017/10/file-sample_150kB.pdf'
    };
    setTimeout(function () {
      return updateEntity({
        data: data
      });
    }, 1000);
  } // handleFileSelection: updateEntity => {
  //   const filenames = ['image.jpg', 'document.pdf', 'music.mp3'];
  //   const name = filenames[Math.floor(Math.random() * filenames.length)];
  //   const filenameParts = name.split('.');
  //   const type = filenameParts[filenameParts.length - 1];
  //   const data = {
  //     name,
  //     type,
  //     url: 'http://file-examples.com/wp-content/uploads/2017/10/file-sample_150kB.pdf',
  //   };
  //   setTimeout(() => updateEntity({ data }), 500);
  // },

}), (0, _defineProperty2.default)(_config, _wixRichContentPluginTextColor.TEXT_COLOR_TYPE, {
  getPaletteColors: function getPaletteColors() {
    return (0, _textColorStyleFn.getPaletteColors)(themeColors);
  },
  styleSelectionPredicate: (0, _textColorStyleFn.getStyleSelectionPredicate)(themeColors),
  colorToStyle: (0, _textColorStyleFn.getColorToStyle)(themeColors),
  styleToColor: (0, _textColorStyleFn.getStyleToColor)(themeColors),
  selectionColor: 'fuchsia',
  onColorAdded: function onColorAdded(color) {
    return userColors = [color].concat((0, _toConsumableArray2.default)(userColors));
  },
  getUserColors: function getUserColors() {
    return userColors;
  },
  customStyleFn: (0, _textColorStyleFn.getCustomStyleFn)(themeColors)
}), (0, _defineProperty2.default)(_config, "uiSettings", uiSettings), (0, _defineProperty2.default)(_config, "getToolbarSettings", function getToolbarSettings(_ref2) {
  var pluginButtons = _ref2.pluginButtons,
      textButtons = _ref2.textButtons;
  return [// {
    //   name: TOOLBARS.PLUGIN,
    //   getVisibilityFn: () => ({
    //     desktop: () => true,
    //     mobile: {
    //       ios: () => true,
    //       android: () => true
    //     }
    //   }),
    //   getPositionOffset: () => ({
    //     desktop: { x: 850, y: 20 },
    //     mobile: {
    //       ios: { x: 100, y: -100 },
    //       android: { x: -100, y: -100 }
    //     }
    //   }),
    //   getDisplayOptions: () => ({
    //     desktop: { displayMode:  DISPLAY_MODE.FLOATING },
    //   }),
    //   getButtons: () => {
    //     const buttons = pluginButtons.filter(({ type }) => type !== BUTTONS.DELETE);
    //     return {
    //       desktop: buttons,
    //       mobile: {
    //         ios: buttons,
    //         android: buttons
    //       }
    //     };
    //   },
    //   getToolbarDecorationFn: () => ({
    //     desktop: () => PluginToolbarDecoration
    //   })
    // },
    // {
    //   name: TOOLBARS.SIDE,
    //   getDisplayOptions: () => ({
    //     desktop: { displayMode:  DISPLAY_MODE.FLOATING },
    //   }),
    //   getPositionOffset: () => ({
    //     desktop: { x: 1000, y: 780 },
    //     mobile: {
    //       ios: { x: 0, y: 0 },
    //       android: { x: 0, y: 0 },
    //     }
    //   }),
    //   getToolbarDecorationFn: () => ({
    //     desktop: () => SideToolbarDecoration
    //   })
    // },
    // {
    //   name: TOOLBARS.MOBILE,
    //   getDisplayOptions: () => ({
    //     mobile: {
    //       ios: { displayMode:  DISPLAY_MODE.FLOATING },
    //       android: { displayMode:  DISPLAY_MODE.FLOATING },
    //     }
    //   }),
    //   getPositionOffset: () => ({
    //     desktop: { x: 850, y: 50 },
    //     mobile: {
    //       ios: { x: 0, y: 0 },
    //       android: { x: 0, y: 0 },
    //     }
    //   })
    // },
    // {
    //   name: TOOLBARS.FOOTER,
    //   getPositionOffset: () => ({
    //     desktop: { x: 0, y: 700 },
    //     mobile: {
    //       ios: { x: 0, y: 500 },
    //     }
    //   }),
    //   getVisibilityFn: () => ({
    //     desktop: () => true,
    //     mobile: {
    //       ios: () => true,
    //       android: () => true,
    //     }
    //   }),
    //   getDisplayOptions: () => ({
    //     desktop: { displayMode:  DISPLAY_MODE.FLOATING },
    //   }),
    //   getButtons: () => ({
    //     desktop: () => [],
    //     mobile: {
    //       ios: pluginButtons.filter(({ buttonSettings }) => buttonSettings.toolbars.includes(TOOLBARS.FOOTER))
    //       .map(({ component }) => component),
    //       android: () => [],
    //     }
    //   }),
    // },
    // {
    //   name: TOOLBARS.STATIC,
    //   getVisibilityFn: () => ({
    //     desktop: () => true,
    //   }),
    //   getDisplayOptions: () => ({
    //     desktop: { displayMode:  DISPLAY_MODE.FLOATING },
    //   }),
    //   getPositionOffset: () => ({
    //     desktop: { x: 0, y: 0 },
    //   }),
    //   getToolbarDecorationFn: () => ({
    //     desktop: () => StaticToolbarDecoration
    //   })
    // },
    // {
    //   name: TOOLBARS.INLINE,
    //   getToolbarDecorationFn: () => ({
    //     desktop: () => InlineToolbarDecoration
    //   })
    // }
  ];
}), _config);
exports.config = config;
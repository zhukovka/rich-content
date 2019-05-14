"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _wixRichContentPluginVideo = require("wix-rich-content-plugin-video");

var _wixRichContentPluginSoundCloud = require("wix-rich-content-plugin-sound-cloud");

var _wixRichContentPluginGiphy = require("wix-rich-content-plugin-giphy");

var _wixRichContentPluginImage = require("wix-rich-content-plugin-image");

var _wixRichContentPluginTextColor = require("wix-rich-content-plugin-text-color");

// import { ModalsMap as GalleryModalsMap } from 'wix-rich-content-plugin-gallery';
var _default = (0, _objectSpread2.default)({}, _wixRichContentPluginVideo.ModalsMap, _wixRichContentPluginSoundCloud.ModalsMap, _wixRichContentPluginGiphy.ModalsMap, _wixRichContentPluginImage.ModalsMap, _wixRichContentPluginTextColor.ModalsMap);

exports.default = _default;
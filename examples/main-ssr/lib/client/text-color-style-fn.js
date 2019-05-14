"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPaletteColors = exports.getStyleToColor = exports.getColorToStyle = exports.getStyleSelectionPredicate = exports.getCustomStyleFn = exports.getViewerCustomStyleFn = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _head = _interopRequireDefault(require("lodash/head"));

var _wixRichContentCommon = require("wix-rich-content-common");

var getViewerCustomStyleFn = function getViewerCustomStyleFn(colorMap) {
  return function (style) {
    var colorRule = {};

    if ((0, _wixRichContentCommon.isHexColor)(colorMap[style])) {
      colorRule = {
        color: colorMap[style]
      };
    } else if ((0, _wixRichContentCommon.isHexColor)(style)) {
      colorRule = {
        color: style
      };
    }

    return colorRule;
  };
};

exports.getViewerCustomStyleFn = getViewerCustomStyleFn;

var getCustomStyleFn = function getCustomStyleFn(colorMap) {
  return function (styles) {
    return styles.toArray().reduce(function (cssStyle, style) {
      return (0, _objectSpread2.default)({}, cssStyle, getViewerCustomStyleFn(colorMap)(style));
    }, {});
  };
};

exports.getCustomStyleFn = getCustomStyleFn;

var getStyleSelectionPredicate = function getStyleSelectionPredicate(colorMap) {
  return function (style) {
    return (0, _wixRichContentCommon.isHexColor)(colorMap[style]) || (0, _wixRichContentCommon.isHexColor)(style);
  };
};

exports.getStyleSelectionPredicate = getStyleSelectionPredicate;

var getColorToStyle = function getColorToStyle(colorMap) {
  return function (color) {
    return (0, _head.default)(Object.keys(colorMap).filter(function (key) {
      return colorMap[key] === color;
    })) || color;
  };
};

exports.getColorToStyle = getColorToStyle;

var getStyleToColor = function getStyleToColor(colorMap) {
  return function (style) {
    return colorMap[style] || style;
  };
};

exports.getStyleToColor = getStyleToColor;

var getPaletteColors = function getPaletteColors(colorMap) {
  return Object.values(colorMap);
};

exports.getPaletteColors = getPaletteColors;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _App = _interopRequireDefault(require("./App"));

require("./index.css");

_reactDom.default.hydrate(_react.default.createElement(_App.default, null), document.getElementById('root'));
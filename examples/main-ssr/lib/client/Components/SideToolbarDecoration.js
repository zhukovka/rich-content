"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var SideToolbarDecoration =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(SideToolbarDecoration, _Component);

  function SideToolbarDecoration() {
    (0, _classCallCheck2.default)(this, SideToolbarDecoration);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(SideToolbarDecoration).apply(this, arguments));
  }

  (0, _createClass2.default)(SideToolbarDecoration, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          style = _this$props.style,
          className = _this$props.className,
          children = _this$props.children,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["style", "className", "children"]);
      console.log('SideToolbarDecoration rendered');
      return _react.default.createElement("div", (0, _extends2.default)({
        style: style,
        className: className
      }, props), children);
    }
  }]);
  return SideToolbarDecoration;
}(_react.Component);

SideToolbarDecoration.propTypes = {
  children: _propTypes.default.node,
  style: _propTypes.default.object,
  className: _propTypes.default.string
};
SideToolbarDecoration.displayName = 'SideToolbarDecoration';
var _default = SideToolbarDecoration;
exports.default = _default;
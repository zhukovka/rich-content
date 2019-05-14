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

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _draftJs = require("@wix/draft-js");

var _InlineToolbarDecoration = _interopRequireDefault(require("./InlineToolbarDecoration.scss"));

var InlineToolbarDecoration =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(InlineToolbarDecoration, _Component);

  function InlineToolbarDecoration() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, InlineToolbarDecoration);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(InlineToolbarDecoration)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.handleRef = function (el) {
      _this.element = el;
      return _this.props.refCallback(el);
    };

    return _this;
  }

  (0, _createClass2.default)(InlineToolbarDecoration, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          style = _this$props.style,
          className = _this$props.className,
          refCallback = _this$props.refCallback,
          children = _this$props.children,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["style", "className", "refCallback", "children"]);
      var alteredStyle = style;

      if (alteredStyle.top) {
        alteredStyle.top -= 10;
      }

      var selectionRect = (0, _draftJs.getVisibleSelectionRect)(window);
      var toolbarRect = this.element ? this.element.getBoundingClientRect() : {};
      console.log('TCL: InlineToolbarDecoration -> render -> toolbarRect', toolbarRect);
      var relLeft = selectionRect ? selectionRect.left + selectionRect.width / 2 : 0;
      var toolbarLeft = toolbarRect.left || 0;
      var left = relLeft - toolbarLeft;
      var arrowStyle = {
        left: left
      };
      return _react.default.createElement("div", (0, _extends2.default)({
        style: alteredStyle,
        className: className,
        ref: this.handleRef
      }, props), _react.default.createElement("div", {
        className: _InlineToolbarDecoration.default.arrow,
        style: arrowStyle
      }), children);
    }
  }]);
  return InlineToolbarDecoration;
}(_react.Component);

InlineToolbarDecoration.propTypes = {
  children: _propTypes.default.node,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  refCallback: _propTypes.default.func
};
InlineToolbarDecoration.displayName = 'InlineToolbarDecoration';
var _default = InlineToolbarDecoration;
exports.default = _default;
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _reactModal = _interopRequireDefault(require("react-modal"));

var _wixRichContentViewer = require("wix-rich-content-viewer");

var PropTypes = _interopRequireWildcard(require("prop-types"));

var Plugins = _interopRequireWildcard(require("./ViewerPlugins"));

var _theme = _interopRequireDefault(require("../theme/theme"));

// must import after custom styles
var modalStyleDefaults = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};
var anchorTarget = '_top';
var relValue = 'noreferrer';

var Viewer =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2.default)(Viewer, _PureComponent);

  function Viewer(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Viewer);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Viewer).call(this, props));

    _this.closeModal = function () {
      _this.setState({
        showModal: false,
        modalContent: null
      });
    };

    _this.state = {};
    return _this;
  }

  (0, _createClass2.default)(Viewer, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("div", {
        className: "viewer"
      }, _react.default.createElement(_wixRichContentViewer.RichContentViewer, {
        helpers: this.helpers,
        typeMappers: Plugins.typeMappers,
        decorators: Plugins.decorators,
        config: Plugins.config,
        initialState: this.props.initialState,
        theme: _theme.default,
        isMobile: this.props.mobile,
        anchorTarget: anchorTarget,
        relValue: relValue
      }), _react.default.createElement(_reactModal.default, {
        isOpen: this.state.showModal,
        contentLabel: "External Modal Example",
        style: this.state.modalStyles || modalStyleDefaults,
        onRequestClose: this.closeModal
      }, this.state.showModal && _react.default.createElement(RichContentModal, this.state.modalProps)));
    }
  }]);
  return Viewer;
}(_react.PureComponent);

exports.default = Viewer;
Viewer.propTypes = {
  initialState: PropTypes.any,
  mobile: PropTypes.any,
  config: PropTypes.any
};
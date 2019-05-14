"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactJsonEditorAjrm = _interopRequireDefault(require("react-json-editor-ajrm"));

var _get = _interopRequireDefault(require("lodash/get"));

var _set = _interopRequireDefault(require("lodash/set"));

var _isEqual = _interopRequireDefault(require("lodash/isEqual"));

var _debounce = _interopRequireDefault(require("lodash/debounce"));

var RichContentRawDataEditor =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(RichContentRawDataEditor, _React$Component);

  function RichContentRawDataEditor(props) {
    var _this;

    (0, _classCallCheck2.default)(this, RichContentRawDataEditor);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(RichContentRawDataEditor).call(this, props));
    _this.forceUpdateDebounced = (0, _debounce.default)(_this.forceUpdate, 70);

    _this.onChange = function (content) {
      if (content && content.jsObject && !content.error) {
        _this.content = content.jsObject;

        _this.props.onChange(content.jsObject);
      }
    };

    _this.enableEditing = function () {
      _this.setState({
        editingEnabled: true
      });
    };

    _this.render = function () {
      return _react.default.createElement("div", {
        onClick: _this.enableEditing
      }, _react.default.createElement(_reactJsonEditorAjrm.default, {
        viewOnly: !_this.state.editingEnabled,
        placeholder: fixKeys(_this.props.content),
        id: _this.id,
        onChange: _this.onChange,
        waitAfterKeyPress: 100,
        width: '100%'
      }));
    };

    _this.id = "rcrv_".concat(Math.floor(Math.random() * 9999));
    _this.state = {
      content: fixKeys(props.content)
    };
    return _this;
  }

  (0, _createClass2.default)(RichContentRawDataEditor, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
      if (this.state.editingEnabled !== nextState.editingEnabled || !(0, _isEqual.default)(nextProps.content, this.content)) {
        this.content = nextProps.content;
        this.forceUpdateDebounced();
      }

      return false;
    }
  }]);
  return RichContentRawDataEditor;
}(_react.default.Component);

function fixKeys(content) {
  var fixed = {};

  if (content && content.entityMap) {
    var fixedEntityMap = Object.keys(content.entityMap).reduce(function (map, key) {
      var entity = content.entityMap[key];
      var videoHtml = (0, _get.default)(entity, 'data.metadata.html');

      if (videoHtml) {
        (0, _set.default)(entity, 'data.metadata.html', escapeHtml(videoHtml));
      } else if ((0, _get.default)(entity, 'data.srcType') === 'html') {
        var htmlSrc = (0, _get.default)(entity, 'data.src');
        (0, _set.default)(entity, 'data.src', escapeHtml(htmlSrc));
      }

      return Object.assign(map, (0, _defineProperty2.default)({}, key, entity));
    }, {});
    fixed = Object.assign({}, content, {
      entityMap: fixedEntityMap
    });
  }

  if (fixed && fixed.blocks) {
    var fixedBlocks = fixed.blocks.map(function (block) {
      if (block.text) {
        block.text = escapeNewLine(block.text);
      }

      return block;
    });
    return Object.assign({}, fixed, {
      blocks: fixedBlocks
    });
  }
}

function escapeNewLine(text) {
  return text.replace(/[\n\r]/gim, '\\n');
}

function escapeHtml(text) {
  return text.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;').replace(/\//g, '&#047;');
} // see https://github.com/AndrewRedican/react-json-editor-ajrm for details


RichContentRawDataEditor.propTypes = {
  content: _propTypes.default.object.isRequired,
  onChange: _propTypes.default.func.isRequired,
  viewOnly: _propTypes.default.bool,
  confirmGood: _propTypes.default.bool,
  height: _propTypes.default.string,
  width: _propTypes.default.string,
  onKeyPressUpdate: _propTypes.default.func,
  waitAfterKeyPress: _propTypes.default.func,
  theme: _propTypes.default.string,
  colors: _propTypes.default.object,
  style: _propTypes.default.object
};
var _default = RichContentRawDataEditor;
exports.default = _default;
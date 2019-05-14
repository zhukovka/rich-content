"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _mobileDetect = _interopRequireDefault(require("mobile-detect"));

var _draftJs = require("@wix/draft-js");

var _wixRichContentCommon = require("wix-rich-content-common");

require("./App.scss");

var _RichContentRawDataEditor = _interopRequireDefault(require("./RichContentRawDataEditor"));

var _Editor = _interopRequireDefault(require("./editor/Editor"));

var _Viewer = _interopRequireDefault(require("./viewer/Viewer"));

var _reResizable = _interopRequireDefault(require("re-resizable"));

var _startCase = _interopRequireDefault(require("lodash/startCase"));

var _cloneDeep = _interopRequireDefault(require("lodash/cloneDeep"));

var _localStorage = _interopRequireDefault(require("local-storage"));

/* eslint-disable */
// const whyDidYouRender = require('@welldone-software/why-did-you-render/dist/no-classes-transpile/umd/whyDidYouRender.min.js');
// whyDidYouRender(React, { include: [/.*/], exclude: [/Decor|JSONI/] });
var anchorTarget = '_top';
var relValue = 'noreferrer';

function Checkbox(_ref) {
  var name = _ref.name,
      onChange = _ref.onChange,
      inputProps = (0, _objectWithoutProperties2.default)(_ref, ["name", "onChange"]);

  var handleChange = function handleChange(e) {
    return onChange(name, e.target.checked);
  };

  return _react.default.createElement("label", null, _react.default.createElement("input", (0, _extends2.default)({
    type: "checkbox",
    onChange: handleChange
  }, inputProps)), (0, _startCase.default)(name));
}

var checkBoxes = ['editor', 'viewer', 'contentStateEditor', 'mounted', 'staticToolbar', 'mobile', 'readOnly'];
var mobileCheckBoxes = ['editor', 'viewer'];

var App =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2.default)(App, _React$PureComponent);

  function App(props) {
    var _this;

    (0, _classCallCheck2.default)(this, App);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(App).call(this, props));

    _this.onEditorChange = function (editorState) {
      var state = {
        lastSave: new Date(),
        editorState: editorState
      };
      var content = editorState.getCurrentContent();

      if (content !== _this.state.editorState.getCurrentContent()) {
        state.viewerState = (0, _draftJs.convertToRaw)(content);
      }

      _this.setState(state);
    };

    _this.isMobileDevice = function () {
      return _this.md && _this.md.mobile() !== null;
    };

    _this.onRichContentRawDataEditorChange = function (obj) {
      _this.setState(_this.convertJsObject(obj));
    };

    _this.onCheckBoxChange = function (name, checked) {
      _this.setState((0, _defineProperty2.default)({}, name, checked));

      _localStorage.default.set(name, checked);
    };

    _this.state = (0, _objectSpread2.default)({
      lastSave: new Date(),
      editorState: _draftJs.EditorState.createEmpty(),
      mounted: true,
      contentStateEditor: true,
      showDevToggles: true,
      editor: true,
      viewer: true
    }, _this.getLocalStorageState());
    _this.md = typeof window !== 'undefined' ? new _mobileDetect.default(window.navigator.userAgent) : null;
    return _this;
  }

  (0, _createClass2.default)(App, [{
    key: "getLocalStorageState",
    value: function getLocalStorageState() {
      var state = {};
      [].concat(checkBoxes, ['contentWidth']).forEach(function (key) {
        var val = _localStorage.default.get(key);

        if (val !== null) {
          state[key] = val;
        }
      });
      return state;
    }
  }, {
    key: "convertJsObject",
    value: function convertJsObject(obj) {
      var normalizedState = (0, _wixRichContentCommon.normalizeInitialState)(obj, {
        anchorTarget: anchorTarget,
        relValue: relValue
      });

      var editorState = _draftJs.EditorState.createWithContent((0, _draftJs.convertFromRaw)(normalizedState));

      return {
        editorState: editorState,
        viewerState: normalizedState
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          showDevToggles = _this$state.showDevToggles,
          simulateMobile = _this$state.mobile,
          showEditor = _this$state.editor,
          showViewer = _this$state.viewer,
          showContentStateEditor = _this$state.contentStateEditor;
      var isMobileDevice = this.isMobileDevice();
      var isMobile = simulateMobile || isMobileDevice;

      var editor = _react.default.createElement(_Editor.default, {
        onChange: this.onEditorChange,
        editorState: this.state.editorState,
        readOnly: this.state.readOnly,
        mobile: isMobile,
        staticToolbar: this.state.staticToolbar
      });

      var viewer = _react.default.createElement(_Viewer.default, {
        initialState: this.state.viewerState,
        mobile: isMobile,
        config: this.config
      });

      var checkBoxComponents = (isMobileDevice ? mobileCheckBoxes : checkBoxes).map(function (name) {
        return _react.default.createElement("div", {
          className: "toggle"
        }, _react.default.createElement(Checkbox, {
          name: name,
          checked: _this2.state[name],
          onChange: _this2.onCheckBoxChange
        }));
      });
      return _react.default.createElement("div", {
        className: "wrapper"
      }, _react.default.createElement("div", {
        className: "container"
      }, !isMobileDevice && _react.default.createElement("div", {
        className: "header"
      }, _react.default.createElement("h1", {
        onClick: function onClick() {
          return _this2.setState({
            showDevToggles: !showDevToggles
          });
        }
      }, "Wix Rich Content Editor"), _react.default.createElement("div", {
        className: "toggle-container",
        style: {
          display: this.state.showDevToggles ? 'block' : 'none'
        }
      }, checkBoxComponents), _react.default.createElement("span", {
        className: "intro"
      }, "Last saved on ", this.state.lastSave.toTimeString())), _react.default.createElement("div", {
        className: "content"
      }, this.state.mounted && _react.default.createElement("div", {
        className: "columns"
      }, isMobileDevice ? _react.default.createElement("div", {
        className: 'mobileDevice',
        style: {
          width: '100%'
        }
      }, _react.default.createElement("div", {
        style: {
          display: 'flex'
        }
      }, checkBoxComponents), showEditor && editor, showViewer && viewer) : _react.default.createElement(_reResizable.default, {
        onResize: function onResize(event, direction, _ref2) {
          var clientWidth = _ref2.clientWidth;
          return _localStorage.default.set('contentWidth', clientWidth);
        },
        defaultSize: {
          width: this.state.contentWidth || '85%'
        },
        className: 'resizable'
      }, showEditor && editor, showViewer && viewer), showContentStateEditor && !isMobileDevice && _react.default.createElement("div", {
        className: "column side"
      }, _react.default.createElement(_RichContentRawDataEditor.default, {
        onChange: this.onRichContentRawDataEditorChange,
        content: (0, _cloneDeep.default)((0, _draftJs.convertToRaw)(this.state.editorState.getCurrentContent()))
      }))))));
    }
  }]);
  return App;
}(_react.default.PureComponent);

var _default = App;
exports.default = _default;
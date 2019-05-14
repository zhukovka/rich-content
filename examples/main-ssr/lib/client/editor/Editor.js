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

var _wixRichContentEditor = require("wix-rich-content-editor");

var PropTypes = _interopRequireWildcard(require("prop-types"));

var _reactModal = _interopRequireDefault(require("react-modal"));

var _mock = require("./mock");

var Plugins = _interopRequireWildcard(require("./EditorPlugins"));

var _ModalsMap = _interopRequireDefault(require("./ModalsMap"));

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
var anchorTarget = '_blank';
var relValue = 'nofollow';

var Editor =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2.default)(Editor, _PureComponent);

  function Editor(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Editor);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Editor).call(this, props));
    _this.state = {};

    _this.setEditorToolbars = function () {
      var _this$editor$getToolb = _this.editor.getToolbars(),
          MobileToolbar = _this$editor$getToolb.MobileToolbar,
          TextToolbar = _this$editor$getToolb.TextToolbar;

      _this.setState({
        MobileToolbar: MobileToolbar,
        TextToolbar: TextToolbar
      });
    };

    _this.initEditorProps();

    return _this;
  }

  (0, _createClass2.default)(Editor, [{
    key: "initEditorProps",
    value: function initEditorProps() {
      var _this2 = this;

      var mockUpload = function mockUpload(files, updateEntity) {
        //mock upload
        var testItem = _mock.testImages[Math.floor(Math.random() * _mock.testImages.length)];

        var data = {
          id: testItem.photoId,
          original_file_name: files && files[0] ? files[0].name : testItem.url,
          file_name: testItem.url,
          width: testItem.metadata.width,
          height: testItem.metadata.height
        };
        setTimeout(function () {
          updateEntity({
            data: data,
            files: files
          });
          console.log('consumer uploaded', data);
        }, 500);
      };

      this.helpers = {
        onFilesChange: function onFilesChange(files, updateEntity) {
          return mockUpload(files, updateEntity);
        },
        // handleFileSelection: (index, multiple, updateEntity, removeEntity) => {
        //   const count = multiple ? [1,2,3] : [1];
        //   const data = [];
        //   count.forEach(_ => {
        //     const testItem = testImages[Math.floor(Math.random() * testImages.length)];
        //     data.push({
        //       id: testItem.photoId,
        //       original_file_name: testItem.url,
        //       file_name: testItem.url,
        //       width: testItem.metadata.width,
        //       height: testItem.metadata.height,
        //     });
        //   })
        //   setTimeout(() => { updateEntity({ data }) }, 500);
        // },
        onVideoSelected: function onVideoSelected(url, updateEntity) {
          setTimeout(function () {
            var testVideo = _mock.testVideos[Math.floor(Math.random() * _mock.testVideos.length)];

            updateEntity(testVideo);
          }, 500);
        },
        openModal: function openModal(data) {
          var modalStyles = data.modalStyles,
              modalProps = (0, _objectWithoutProperties2.default)(data, ["modalStyles"]);

          try {
            document.documentElement.style.height = '100%';
            document.documentElement.style.position = 'relative';
          } catch (e) {
            console.warn('Cannot change document styles', e);
          }

          _this2.setState({
            showModal: true,
            modalProps: modalProps,
            modalStyles: modalStyles
          });
        },
        closeModal: function closeModal() {
          try {
            document.documentElement.style.height = 'initial';
            document.documentElement.style.position = 'initial';
          } catch (e) {
            console.warn('Cannot change document styles', e);
          }

          _this2.setState({
            showModal: false,
            modalProps: null,
            modalStyles: null,
            modalContent: null
          });
        }
      };
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      _reactModal.default.setAppElement('body');

      this.setEditorToolbars();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.staticToolbar !== this.props.staticToolbar) {
        this.setEditorToolbars();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var modalStyles = {
        content: Object.assign({}, (this.state.modalStyles || modalStyleDefaults).content, _theme.default.modalTheme.content),
        overlay: Object.assign({}, (this.state.modalStyles || modalStyleDefaults).overlay, _theme.default.modalTheme.overlay)
      };
      var _this$state = this.state,
          MobileToolbar = _this$state.MobileToolbar,
          TextToolbar = _this$state.TextToolbar;
      var textToolbarType = this.props.staticToolbar ? 'static' : null;
      return _react.default.createElement("div", {
        className: 'editor'
      }, MobileToolbar && _react.default.createElement(MobileToolbar, null), TextToolbar && _react.default.createElement(TextToolbar, null), _react.default.createElement(_wixRichContentEditor.RichContentEditor, {
        ref: function ref(editor) {
          return _this3.editor = editor;
        },
        onChange: this.props.onChange,
        helpers: this.helpers,
        plugins: Plugins.editorPlugins,
        config: Plugins.config,
        editorState: this.props.editorState // initialState={this.state.initialState}
        ,
        readOnly: this.props.readOnly,
        isMobile: this.props.isMobile,
        textToolbarType: textToolbarType,
        theme: _theme.default,
        editorKey: 'random-editorKey-ssr',
        anchorTarget: anchorTarget,
        relValue: relValue
      }), _react.default.createElement(_reactModal.default, {
        isOpen: this.state.showModal,
        contentLabel: "External Modal Example",
        style: modalStyles,
        role: "dialog",
        onRequestClose: this.helpers.closeModal
      }, this.state.showModal && _react.default.createElement(_wixRichContentEditor.RichContentEditorModal, (0, _extends2.default)({
        modalsMap: _ModalsMap.default
      }, this.state.modalProps))));
    }
  }]);
  return Editor;
}(_react.PureComponent);

exports.default = Editor;
Editor.propTypes = {
  onChange: PropTypes.func,
  editorState: PropTypes.object,
  readOnly: PropTypes.bool,
  isMobile: PropTypes.bool,
  staticToolbar: PropTypes.bool
};
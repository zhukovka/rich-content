"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _richContentEditorTheme = _interopRequireDefault(require("./rich-content-editor.theme.scss"));

var _pluginLinkTheme = _interopRequireDefault(require("./plugin-link.theme.scss"));

var _textLinkTheme = _interopRequireDefault(require("./text-link.theme.scss"));

var _textHashtagTheme = _interopRequireDefault(require("./text-hashtag.theme.scss"));

var _dividerTheme = _interopRequireDefault(require("./divider.theme.scss"));

var _htmlTheme = _interopRequireDefault(require("./html.theme.scss"));

var _imageTheme = _interopRequireDefault(require("./image.theme.scss"));

var _videoTheme = _interopRequireDefault(require("./video.theme.scss"));

var _fileUploadTheme = _interopRequireDefault(require("./file-upload.theme.scss"));

var _globalTheme = _interopRequireDefault(require("./global.theme.scss"));

var _checkboxTheme = _interopRequireDefault(require("./checkbox.theme.scss"));

var _loaderTheme = _interopRequireDefault(require("./loader.theme.scss"));

var _dropdownTheme = _interopRequireDefault(require("./dropdown.theme.scss"));

var _buttonTheme = _interopRequireDefault(require("./button.theme.scss"));

var _image_componentTheme = _interopRequireDefault(require("./image_component.theme.scss"));

var _inputWithLabelTheme = _interopRequireDefault(require("./input-with-label.theme.scss"));

var _radioGroupHorizontalTheme = _interopRequireDefault(require("./radio-group-horizontal.theme.scss"));

var _radioGroupTheme = _interopRequireDefault(require("./radio-group.theme.scss"));

var _settingsPanelFooterTheme = _interopRequireDefault(require("./settings-panel-footer.theme.scss"));

var _settingsSectionTheme = _interopRequireDefault(require("./settings-section.theme.scss"));

var _selectionListTheme = _interopRequireDefault(require("./selection-list.theme.scss"));

var _sliderTheme = _interopRequireDefault(require("./slider.theme.scss"));

var _tabsTheme = _interopRequireDefault(require("./tabs.theme.scss"));

var _tooltipTheme = _interopRequireDefault(require("./tooltip.theme.scss"));

var _inlineToolbarTheme = _interopRequireDefault(require("./toolbars/inline-toolbar.theme.scss"));

var _textStaticToolbarTheme = _interopRequireDefault(require("./toolbars/text-static-toolbar.theme.scss"));

var _sideToolbarTheme = _interopRequireDefault(require("./toolbars/side-toolbar.theme.scss"));

var _pluginToolbarTheme = _interopRequireDefault(require("./toolbars/plugin-toolbar.theme.scss"));

var _footerToolbarTheme = _interopRequireDefault(require("./toolbars/footer-toolbar.theme.scss"));

var _mobileToolbarTheme = _interopRequireDefault(require("./toolbars/mobile-toolbar.theme.scss"));

var _mobileAddModalTheme = _interopRequireDefault(require("./toolbars/mobile-add-modal.theme.scss"));

var _toolbarSeparatorTheme = _interopRequireDefault(require("./toolbars/toolbar-separator.theme.scss"));

var _addPluginModalTheme = _interopRequireDefault(require("./toolbars/add-plugin-modal.theme.scss"));

var _videoUploadModalTheme = _interopRequireDefault(require("./toolbars/modals/video/video-upload-modal.theme.scss"));

var modalTheme = {
  content: {}
};
var theme = (0, _objectSpread2.default)({
  modalTheme: modalTheme
}, _richContentEditorTheme.default, _textLinkTheme.default, _pluginLinkTheme.default, _textHashtagTheme.default, _dividerTheme.default, _htmlTheme.default, _imageTheme.default, _videoTheme.default, _fileUploadTheme.default, _globalTheme.default, _checkboxTheme.default, _dropdownTheme.default, _buttonTheme.default, _loaderTheme.default, _image_componentTheme.default, _inputWithLabelTheme.default, _radioGroupHorizontalTheme.default, _radioGroupTheme.default, _settingsPanelFooterTheme.default, _settingsSectionTheme.default, _selectionListTheme.default, _sliderTheme.default, _tabsTheme.default, _tooltipTheme.default, _videoUploadModalTheme.default, _addPluginModalTheme.default, _inlineToolbarTheme.default, _textStaticToolbarTheme.default, _sideToolbarTheme.default, _pluginToolbarTheme.default, _footerToolbarTheme.default, _mobileToolbarTheme.default, _mobileAddModalTheme.default, _toolbarSeparatorTheme.default);
var _default = theme;
exports.default = _default;
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import RichContentEditor from './RichContentEditor';
import styles from '../../statics/styles/rich-content-editor.scss';
import 'wix-rich-content-common/dist/statics/styles/draftDefault.rtlignore.scss';

class InnerRCEModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    const { plugins, innerRCERenderedIn, config } = this.props;
    const wantedPlugins = config[innerRCERenderedIn].innerRCEPlugins;
    this.plugins = plugins.filter(plugin => wantedPlugins.includes(plugin.name));
  }

  componentDidMount() {
    const { MobileToolbar, TextToolbar } = this.innerEditor.getToolbars();
    this.setState({ MobileToolbar, TextToolbar });
  }

  componentWillUnmount() {
    this.props.resetInnerRCEState();
  }

  render() {
    const {
      onInnerEditorChange,
      innerRCEEditorState,
      theme,
      closeInnerRCE,
      isMobile,
      editorState,
      onChange,
      plugins,
      ...rest
    } = this.props;
    const { MobileToolbar, TextToolbar } = this.state;
    const TopToolbar = MobileToolbar || TextToolbar;
    return (
      <div
        style={{
          position: 'absolute',
          border: '2px solid orange',
          width: isMobile ? '100%' : '450px',
          backgroundColor: 'white',
          zIndex: 6,
        }}
      >
        <button
          style={{ position: 'absolute', right: 0, zIndex: 1 }}
          onClick={() => closeInnerRCE(true)}
        >
          save
        </button>
        <button
          style={{ position: 'absolute', right: '40px', zIndex: 1 }}
          onClick={() => closeInnerRCE()}
        >
          cancel
        </button>
        <div className={classNames(styles.editor, theme.editor)}>
          {TopToolbar && (
            <div className="toolbar-wrapper">
              <TopToolbar />
            </div>
          )}
          <RichContentEditor
            ref={innerEditor => (this.innerEditor = innerEditor)}
            editorState={innerRCEEditorState}
            onChange={onInnerEditorChange}
            plugins={this.plugins}
            isMobile={isMobile}
            {...rest}
          />
        </div>
      </div>
    );
  }
}

InnerRCEModal.propTypes = {
  onInnerEditorChange: PropTypes.func,
  innerRCEEditorState: PropTypes.object,
  innerRCEPlugins: PropTypes.array,
  theme: PropTypes.object,
  closeInnerRCE: PropTypes.func,
  isMobile: PropTypes.bool,
  editorState: PropTypes.object,
  onChange: PropTypes.func,
  plugins: PropTypes.array,
  resetInnerRCEState: PropTypes.func,
  innerRCERenderedIn: PropTypes.string,
  config: PropTypes.object,
};

export default InnerRCEModal;

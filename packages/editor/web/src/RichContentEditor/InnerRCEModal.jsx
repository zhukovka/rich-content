/* eslint-disable no-console */
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
    console.log({ plugins });
    console.log({ innerRCERenderedIn });
    console.log({ config });
    const wantedPlugins = config[innerRCERenderedIn].innerRCEPlugins;
    console.log({ wantedPlugins });
    this.plugins = plugins.filter(plugin => wantedPlugins.includes(plugin.name));
    console.log('this.plugins = ', this.plugins);
  }

  componentDidMount() {
    const { MobileToolbar, TextToolbar } = this.innerEditor.getToolbars();
    this.setState({ MobileToolbar, TextToolbar });
    this.innerEditor.focus();
  }

  render() {
    const {
      onInnerEditorChange,
      innerRCEEditorState,
      theme,
      isMobile,
      editorState,
      onChange,
      plugins,
      ...rest
    } = this.props;
    const { MobileToolbar, TextToolbar } = this.state;
    const TopToolbar = MobileToolbar || TextToolbar;
    return (
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
          toolbarsToIgnore={['FooterToolbar']}
          {...rest}
        />
      </div>
    );
  }
}

InnerRCEModal.propTypes = {
  onInnerEditorChange: PropTypes.func,
  innerRCEEditorState: PropTypes.object,
  innerRCEPlugins: PropTypes.array,
  theme: PropTypes.object,
  isMobile: PropTypes.bool,
  editorState: PropTypes.object,
  onChange: PropTypes.func,
  plugins: PropTypes.array,
  innerRCERenderedIn: PropTypes.string,
  config: PropTypes.object,
};

export default InnerRCEModal;

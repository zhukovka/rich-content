import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { EditorState, convertFromRaw } from '@wix/draft-js';
import Editor from 'draft-js-plugins-editor';
import isUndefined from 'lodash/isUndefined';
import createToolbars from './Toolbars';
import createPlugins from './Plugins';
import createDecorators from './Decorators';
import '@wix/draft-js/dist/Draft.css'; // must import before custom styles
import Styles from '~/Styles/rich-content-editor.scss';
import 'normalize.css';

export default class RichContentEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: this.getInitialEditorState(),
      readOnly: props.readOnly || false,
      theme: props.theme || {}
    };
    const { plugins, pluginButtons } = createPlugins({ ...props, theme: this.state.theme });
    this.toolbars = createToolbars({ ...props, pluginButtons, theme: this.state.theme });
    this.plugins = [...plugins, ...Object.values(this.toolbars)];
    this.decorators = createDecorators(props.decorators);
  }

  getInitialEditorState() {
    const { editorState, initialState } = this.props;
    if (editorState) {
      return editorState;
    }
    if (initialState) {
      return EditorState.createWithContent(convertFromRaw(initialState));
    } else {
      return EditorState.createEmpty();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!isUndefined(nextProps.readOnly) && this.props.readOnly !== nextProps.readOnly) {
      this.setState({ readOnly: nextProps.readOnly });
    }
    if (this.props.editorState !== nextProps.editorState) {
      this.setState({ editorState: nextProps.editorState });
    }
    if (this.props.theme !== nextProps.theme) {
      this.setState({ theme: nextProps.theme });
    }
  }

  blockStyleFn = contentBlock => {
    const { type, data: { textAlignment } } = contentBlock.toJS();
    const classList = [];
    const { theme } = this.state;

    switch (type) {
      case 'blockquote':
        classList.push(theme.quote);
        classList.push(Styles.quote);
        break;
      case 'header-one':
        classList.push(theme.headerOne);
        classList.push(Styles.headerOne);
        break;
      case 'header-two':
        classList.push(theme.headerTwo);
        classList.push(Styles.headerTwo);
        break;
      case 'header-three':
        classList.push(theme.headerThree);
        classList.push(Styles.headerThree);
        break;
      case 'ordered-list-item':
        classList.push(theme.orderedList);
        classList.push(Styles.orderedList);
        break;
      case 'unordered-list-item':
        classList.push(theme.unorderedList);
        classList.push(Styles.unorderedList);
        break;
      case 'atomic':
        classList.push(theme.atomic);
        classList.push(Styles.atomic);
        break;
      case 'code-block':
        classList.push(theme.codeBlock);
        classList.push(Styles.codeBlock);
        break;
      default:
        classList.push(theme.text);
        classList.push(Styles.text);
    }
    if (type !== 'atomic') {
      classList.push(theme[textAlignment]);
      classList.push(Styles[textAlignment]);
    }
    return classNames(...classList);
  };

  getEditorState = () => this.state.editorState;

  updateEditorState = editorState => {
    this.setState({ editorState });
    this.props.onChange && this.props.onChange(editorState);
  };

  focus = () => this.editor.focus();

  setEditor = ref => (this.editor = ref);

  renderToolbars = () => {
    if (!this.state.readOnly) {
      //eslint-disable-next-line array-callback-return
      const toolbars = this.plugins.map((plugin, index) => {
        const Toolbar = plugin.Toolbar || plugin.InlineToolbar || plugin.SideToolbar;
        if (Toolbar) {
          return <Toolbar key={`k${index}`} />;
        }
      });
      return toolbars;
    }
  };

  renderEditor = () => {
    const { helpers, isMobile } = this.props;
    const { editorState, readOnly } = this.state;
    return (
      <Editor
        ref={this.setEditor}
        editorState={editorState}
        onChange={this.updateEditorState}
        plugins={this.plugins}
        decorators={this.decorators}
        blockStyleFn={this.blockStyleFn}
        readOnly={!!readOnly}
        isMobile={isMobile}
        helpers={helpers}
        spellCheck
      />
    );
  };

  render() {
    const { theme } = this.state;
    const wrapperClassName = classNames(theme.wrapper, Styles.wrapper, {
      [theme.desktop]: !this.props.platform || this.props.platform === 'desktop',
      [Styles.desktop]: !this.props.platform || this.props.platform === 'desktop',
    });
    return (
      <div className={wrapperClassName}>
        <div className={classNames(theme.editor, Styles.editor)}>
          {this.renderEditor()}
          {this.renderToolbars()}
        </div>
      </div>
    );
  }
}

RichContentEditor.propTypes = {
  editorState: PropTypes.instanceOf(EditorState),
  decorators: PropTypes.object,
  initialState: PropTypes.object,
  theme: PropTypes.object,
  onChange: PropTypes.func,
  isMobile: PropTypes.bool,
  readOnly: PropTypes.bool,
  helpers: PropTypes.object,
  platform: PropTypes.string
};

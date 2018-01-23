import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { EditorState, convertFromRaw } from '@wix/draft-js';
import Editor from 'draft-js-plugins-editor';
import isUndefined from 'lodash/isUndefined';
import createPlugins from './Plugins';
import createDecorators from './Decorators';
import 'draft-js/dist/Draft.css'; // must import before custom styles
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
    this.initializePlugins(this.state.theme);
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

  initializePlugins(theme) {
    const getEditorState = () => this.state.editorState;
    const setEditorState = editorState => this.setState({ editorState });
    const editorProps = this.props;
    this.plugins = createPlugins({
      getEditorState,
      setEditorState,
      editorProps,
      theme
    });
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
        classList.push(Styles.quote);
        classList.push(theme.quote);
        break;
      case 'header-one':
        classList.push(Styles.headerOne);
        classList.push(theme.headerOne);
        break;
      case 'header-two':
        classList.push(Styles.headerTwo);
        classList.push(theme.headerTwo);
        break;
      case 'header-three':
        classList.push(Styles.headerThree);
        classList.push(theme.headerThree);
        break;
      case 'ordered-list-item':
        classList.push(Styles.orderedList);
        classList.push(theme.orderedList);
        break;
      case 'unordered-list-item':
        classList.push(Styles.unorderedList);
        classList.push(theme.unorderedList);
        break;
      case 'atomic':
        classList.push(Styles.atomic);
        classList.push(theme.atomic);
        break;
      case 'code-block':
        classList.push(Styles.codeBlock);
        classList.push(theme.codeBlock);
        break;
      default:
        classList.push(Styles.text);
        classList.push(theme.text);
    }
    if (type !== 'atomic') {
      classList.push(Styles[textAlignment]);
      classList.push(theme[textAlignment]);
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
    const wrapperClassName = classNames(Styles.wrapper, theme.wrapper, {
      [Styles.desktop]: !this.props.platform || this.props.platform === 'desktop',
      [theme.desktop]: !this.props.platform || this.props.platform === 'desktop',
    });
    return (
      <div className={wrapperClassName}>
        <div className={classNames(Styles.editor, theme.editor)}>
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
  onChange: PropTypes.func,
  isMobile: PropTypes.bool,
  readOnly: PropTypes.bool,
  helpers: PropTypes.object,
  platform: PropTypes.string,
  theme: PropTypes.object,
};

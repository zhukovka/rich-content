import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import isUndefined from 'lodash.isundefined';
import isEmpty from 'lodash.isempty';
import createPlugins from './Plugins';
import createDecorators from './Decorators';
import Styles from '~/Styles/editor.scss';
import 'draft-js/dist/Draft.css'

export default class RichContentEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editorState: this.getInitialEditorState(),
      readOnly: this.props.readOnly || false,
    };
    this.initializePlugins();
    this.decorators = createDecorators(this.props.decorators);
  };

  getInitialEditorState() {
    const { editorState, initialState } = this.props;
    if (editorState) {
      return editorState;
    }
    if (initialState) {
      return EditorState.createWithContent(convertFromRaw(initialState));
    }
    else {
      return EditorState.createEmpty();
    }
  }

  initializePlugins() {
    const getEditorState = () => this.state.editorState;
    const setEditorState = editorState => this.setState({ editorState });
    const editorProps = this.props;
    this.plugins = createPlugins({getEditorState, setEditorState, editorProps});
  }

  componentWillReceiveProps(nextProps) {
    if (!isUndefined(nextProps.readOnly) && (this.props.readOnly !== nextProps.readOnly)) {
      this.setState({ readOnly: nextProps.readOnly })
    }
    if (this.props.editorState !== nextProps.editorState) {
      this.setState({ editorState: nextProps.editorState});
    }
  }

  blockStyleFn = contentBlock => {
    const { type, data: { textAlignment } } = contentBlock.toJS();
    const classList = [];

    switch (type) {
      case 'blockquote':
        classList.push(Styles.quote);
        break;
      case 'header-one':
        classList.push(Styles.headerOne);
        break;
      case 'header-two':
        classList.push(Styles.headerTwo);
        break;
      case 'header-three':
        classList.push(Styles.headerThree);
        break;
      case 'ordered-list-item':
        classList.push(Styles.orderedList);
        break;
      case 'unordered-list-item':
        classList.push(Styles.unorderedList);
        break;
      case 'atomic':
        classList.push(Styles.atomic);
        break;
      case 'code-block':
        classList.push(Styles.codeBlock);
        break;
      default:
        classList.push(Styles.text);
    }
    if(type !== 'atomic') {
      classList.push(Styles[textAlignment])
    }
    return classNames(...classList);
  };

  getEditorState = () => this.state.editorState;

  updateEditorState = editorState => {
    this.setState({ editorState });
    this.props.onChange && this.props.onChange(editorState);
  };

  focus = () => this.editor.focus();

  setEditor = ref => this.editor = ref;

  renderToolbars = () => {
    if (!this.state.readOnly) {
      const toolbars = this.plugins.map((plugin, index) => {
        const Toolbar = plugin.Toolbar || plugin.InlineToolbar || plugin.SideToolbar;
        if(Toolbar) {
          return (<Toolbar key={`k${index}`}/>)
        }
      });
      return toolbars;
    }
  };

  renderEditor = () => {
    const { helpers, platform } = this.props;
    const { editorState, readOnly } = this.state;
    return <Editor
      ref={this.setEditor}
      editorState={editorState}
      onChange={this.updateEditorState}
      plugins={this.plugins}
      decorators={this.decorators}
      blockStyleFn={this.blockStyleFn}
      readOnly={!!readOnly}
      isMobile={platform}
      helpers={helpers}
      spellCheck={true}
    />;
  };

  render() {
    const wrapperClassName = classNames(Styles.wrapper, {
      [Styles.desktop]: !this.props.platform || this.props.platform === 'desktop'
    });
    return (
      <div className={wrapperClassName}>
        <div className={Styles.editor}>
          {this.renderEditor()}
          {this.renderToolbars()}
        </div>
      </div>
    );
  }
}

RichContentEditor.PropTypes = {
  initialState: PropTypes.object,
  onChange: PropTypes.func,
  isMobile: PropTypes.bool,
  readOnly: PropTypes.bool,
  helpers: PropTypes.object,
};

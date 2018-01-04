import React, { Component } from 'react';
import decorateComponentWithProps from 'decorate-component-with-props';
import DraftOffsetKey from 'draft-js/lib/DraftOffsetKey';
import { Pubsub } from '~/Utils';
import AddPluginBlockSelect from './AddPluginBlockSelect';
import toolbarStyles from '~/Styles/side-toolbar.scss';
import buttonStyles from '~/Styles/toolbar-button.scss';
import addPluginBlockSelectStyles from '~/Styles/add-plugin-block-select.scss';
import 'draft-js-side-toolbar-plugin/lib/plugin.css';

const toolbarOffset = 4;

class SideToolbar extends Component {
  state = {
    position: {
      transform: 'scale(0)',
    }
  }

  componentDidMount() {
    this.props.pubsub.subscribe('editorState', this.onEditorStateChange);
  }

  componentWillUnmount() {
    this.props.pubsub.unsubscribe('editorState', this.onEditorStateChange);
  }

  onEditorStateChange = editorState => {
    const selection = editorState.getSelection();
    const currentContent = editorState.getCurrentContent();
    const currentBlock = currentContent.getBlockForKey(selection.getStartKey());
    const selectionHasContent = currentBlock.getLength() > 0;
    if (!selection.getHasFocus() || selectionHasContent) {
      this.setState({
        position: {
          transform: 'scale(0)',
        },
      });
      return;
    }

    // TODO verify that always a key-0-0 exists
    const offsetKey = DraftOffsetKey.encode(currentBlock.getKey(), 0, 0);
    // Note: need to wait on tick to make sure the DOM node has been create by Draft.js
    setTimeout(() => {
      const node = document.querySelectorAll(`[data-offset-key="${offsetKey}"]`)[0];
      const top = node.getBoundingClientRect().top;
      const parentTop = node.offsetParent.getBoundingClientRect().top;
      const scrollY = window.scrollY == null ? window.pageYOffset : window.scrollY;
      const { offset } = this.props;
      this.setState({
        position: {
          top: (top + scrollY) - parentTop - toolbarOffset + offset.y,
          left: offset.x,
          transform: 'scale(1)',
          transition: 'transform 0.15s cubic-bezier(.3,1.2,.2,1)',
        }
      });
    });
  }

  render() {
    const { theme, pubsub } = this.props;
    return (
      <div
        className={theme.toolbarStyles.wrapper}
        style={this.state.position}
      >
        {this.props.structure.map((Component, index) => (
          <Component
            key={index}
            getEditorState={pubsub.get('getEditorState')}
            setEditorState={pubsub.get('setEditorState')}
            theme={theme}
          />
        ))}
      </div>
    );
  }
}

const createSideToolbar = (config = {}) => {
  const defaultTheme = { buttonStyles, addPluginBlockSelectStyles, toolbarStyles };

  const pubsub = Pubsub({ isVisible: false });

  const {
    theme = defaultTheme,
    structure = [
      DefaultBlockTypeSelect
    ],
    offset = { x: 0, y: 0 },
  } = config;

  const toolbarProps = {
    pubsub,
    structure,
    theme,
    offset
  };

  return {
    initialize: ({ setEditorState, getEditorState }) => {
      pubsub.set('getEditorState', getEditorState);
      pubsub.set('setEditorState', setEditorState);
    },
    onChange: (editorState) => {
      pubsub.set('editorState', editorState);
      return editorState;
    },
    SideToolbar: decorateComponentWithProps(SideToolbar, toolbarProps),
  };
};

export default({ insertPluginButtons, offset }) => {
  return createSideToolbar({
    offset,
    structure: [({ getEditorState, setEditorState, theme }) => (
      <AddPluginBlockSelect
        getEditorState={getEditorState}
        setEditorState={setEditorState}
        theme={theme}
        structure={insertPluginButtons}
      />
    )]
  });
}

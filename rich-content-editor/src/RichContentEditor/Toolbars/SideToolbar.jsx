import React, { Component } from 'react';
import PropTypes from 'prop-types';
import decorateComponentWithProps from 'decorate-component-with-props';
import DraftOffsetKey from 'draft-js/lib/DraftOffsetKey';
import { simplePubsub } from '~/Utils';
import AddPluginBlockSelect from './AddPluginBlockSelect';
import toolbarStyles from '~/Styles/side-toolbar.scss';
import buttonStyles from '~/Styles/toolbar-button.scss';
import addPluginBlockSelectStyles from '~/Styles/add-plugin-block-select.scss';

const toolbarOffset = 4;

class SideToolbar extends Component {
  static propTypes = {
    pubsub: PropTypes.object.isRequired,
    structure: PropTypes.array.isRequired,
    offset: PropTypes.object,
    theme: PropTypes.object,
    isMobile: PropTypes.bool
  };

  state = {
    position: {
      transform: 'scale(0)',
    },
  };

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
      const { isMobile } = this.props;
      const node = document.querySelectorAll(`[data-offset-key="${offsetKey}"]`)[0];
      const top = node.getBoundingClientRect().top;
      const parentTop = node.offsetParent.getBoundingClientRect().top;
      const scrollY = window.scrollY === null ? window.pageYOffset : window.scrollY;
      const { offset } = this.props;
      this.setState({
        position: {
          top: top + scrollY - parentTop - toolbarOffset + offset.y,
          [!isMobile ? 'left' : 'right']: offset.x,
          transform: 'scale(1)',
          transition: 'transform 0.15s cubic-bezier(.3,1.2,.2,1)',
        },
      });
    });
  };

  render() {
    const { theme, pubsub } = this.props;
    return (
      <div className={theme.toolbarStyles.wrapper} style={this.state.position}>
        {this.props.structure.map((Component, index) => (
          <Component key={index} getEditorState={pubsub.get('getEditorState')} setEditorState={pubsub.get('setEditorState')} theme={theme} />
        ))}
      </div>
    );
  }
}

const createSideToolbar = (config = {}) => {
  const defaultTheme = { buttonStyles, addPluginBlockSelectStyles, toolbarStyles };

  const pubsub = simplePubsub({ isVisible: false });

  const {
    theme = defaultTheme,
    structure = [],
    offset = {
      desktop: { x: 0, y: 0 },
      mobile: { x: 0, y: 0 },
    },
    isMobile,
  } = config;

  const toolbarProps = {
    pubsub,
    structure,
    theme,
    isMobile,
    offset: offset[!isMobile ? 'desktop' : 'mobile'],
  };

  return {
    initialize: ({ setEditorState, getEditorState }) => {
      pubsub.set('getEditorState', getEditorState);
      pubsub.set('setEditorState', setEditorState);
    },
    onChange: editorState => {
      pubsub.set('editorState', editorState);
      return editorState;
    },
    SideToolbar: decorateComponentWithProps(SideToolbar, toolbarProps),
  };
};

export default ({ pluginButtons, offset, isMobile }) => {
  return createSideToolbar({
    offset,
    isMobile,
    structure: [
      ({ getEditorState, setEditorState, theme }) => //eslint-disable-line react/prop-types
        (<AddPluginBlockSelect
          getEditorState={getEditorState}
          setEditorState={setEditorState}
          theme={theme}
          structure={pluginButtons}
          isMobile={isMobile}
        />),
    ],
  });
};

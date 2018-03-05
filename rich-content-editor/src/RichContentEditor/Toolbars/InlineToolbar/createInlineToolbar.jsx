import decorateComponentWithProps from 'decorate-component-with-props';
import InlineToolbar from './InlineToolbar';
import { simplePubsub } from '~/Utils';

const createInlineToolbar = (config = {}) => {
  const {
    name = 'InlineToolbar',
    pubsub = simplePubsub(),
    theme,
    toolbarStyle,
    structure = [],
    isMobile = false,
    helpers,
  } = config;

  const toolbarProps = {
    pubsub,
    structure,
    theme,
    toolbarStyle,
    isMobile,
    helpers
  };

  return {
    name,
    initialize: ({ getEditorState, setEditorState }) => {
      pubsub.set('getEditorState', getEditorState);
      pubsub.set('setEditorState', setEditorState);
    },
    // Re-Render the text-toolbar on selection change
    onChange: editorState => {
      pubsub.set('selection', editorState.getSelection());
      return editorState;
    },
    InlineToolbar: decorateComponentWithProps(InlineToolbar, toolbarProps),
  };
};

export default createInlineToolbar;

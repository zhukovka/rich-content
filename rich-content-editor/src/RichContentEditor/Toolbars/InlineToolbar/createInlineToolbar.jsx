import decorateComponentWithProps from 'decorate-component-with-props';
import InlineToolbar from './InlineToolbar';
import { simplePubsub } from '~/Utils';
import toolbarStyles from '~/Styles/text-toolbar.scss';
import buttonStyles from '~/Styles/text-toolbar-button.scss';

const createInlineToolbar = (config = {}) => {
  const defaultTheme = { buttonStyles, toolbarStyles };

  const {
    name = 'InlineToolbar',
    pubsub = simplePubsub(),
    theme = defaultTheme,
    structure = []
  } = config;

  const toolbarProps = {
    pubsub,
    structure,
    theme,
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

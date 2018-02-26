import decorateComponentWithProps from 'decorate-component-with-props';
import StaticToolbar from './StaticToolbar';
import { simplePubsub } from '~/Utils';

export default (config = {}) => {
  const pubsub = simplePubsub();

  const {
    name = 'StaticToolbar',
    theme,
    toolbarStyle,
    structure = []
  } = config;

  const toolbarProps = {
    pubsub,
    structure,
    theme,
    toolbarStyle,
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
    Toolbar: decorateComponentWithProps(StaticToolbar, toolbarProps),
  };
};


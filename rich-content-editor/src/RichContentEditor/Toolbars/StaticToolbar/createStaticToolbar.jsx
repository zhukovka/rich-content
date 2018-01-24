import decorateComponentWithProps from 'decorate-component-with-props';
import StaticToolbar from './StaticToolbar';
import { simplePubsub } from '~/Utils';
import toolbarStyles from '~/Styles/static-toolbar.scss';
import buttonStyles from '~/Styles/toolbar-button.scss';

export default (config = {}) => {
  const defaultTheme = { buttonStyles, toolbarStyles };

  const pubsub = simplePubsub();

  const {
    theme = defaultTheme,
    structure = []
  } = config;

  const toolbarProps = {
    pubsub,
    structure,
    theme,
  };

  return {
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


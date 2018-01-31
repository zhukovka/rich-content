
import decorateComponentWithProps from 'decorate-component-with-props';
import AddPluginPanel from './AddPluginPanel';

const createAddPluginPanel = (config = {}) => {
  const {
    name = 'AddPluginPanel',
    pubsub,
    theme,
    structure = []
  } = config;

  const panelProps = {
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
    Panel: decorateComponentWithProps(AddPluginPanel, panelProps),
  };
};

export default ({ buttons, pubsub, theme }) => {
  const structure = buttons;
  return createAddPluginPanel({
    pubsub,
    structure,
    theme,
  });
};

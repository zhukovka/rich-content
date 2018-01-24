import React from 'react';
import decorateComponentWithProps from 'decorate-component-with-props';
import SideToolbar from './SideToolbar';
import AddPluginBlockSelect from './AddPluginBlockSelect';
import { simplePubsub } from '~/Utils';
import toolbarStyles from '~/Styles/side-toolbar.scss';
import buttonStyles from '~/Styles/toolbar-button.scss';
import addPluginBlockSelectStyles from '~/Styles/add-plugin-block-select.scss';

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

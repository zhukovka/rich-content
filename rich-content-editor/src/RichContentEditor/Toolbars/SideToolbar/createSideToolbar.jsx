import React from 'react';
import decorateComponentWithProps from 'decorate-component-with-props';
import SideToolbar from './SideToolbar';
import AddPluginFloatingToolbar from './AddPluginFloatingToolbar';
import { simplePubsub } from '~/Utils';

const createSideToolbar = (config = {}) => {
  const {
    name = 'SideToolbar',
    pubsub = simplePubsub({ isVisible: false }),
    theme,
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
    name,
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



export default ({ buttons, offset, pubsub, theme, isMobile }) => {
  return createSideToolbar({
    offset,
    theme,
    isMobile,
    structure: [
      ({ getEditorState, setEditorState, theme }) => //eslint-disable-line react/prop-types
        (<AddPluginFloatingToolbar
          getEditorState={getEditorState}
          setEditorState={setEditorState}
          theme={theme}
          structure={buttons}
          pubsub={pubsub}
          isMobile={isMobile}
        />),
    ],
  });
};

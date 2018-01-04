import React from 'react';
import {
  SelectionState,
  EditorState,
  Modifier,
} from 'draft-js';
import includes from 'lodash.includes';
import cloneDeep from 'lodash.clonedeep';
import { Pubsub } from '~/Utils';
import createBaseComponent from './baseComponent';
import createToolbar from './baseToolbar';
import createInsertPluginButton from './baseInsertPluginButton';

const updateEntityData = (contentBlock, { getEditorState, setEditorState }, getNewData) => {
  const entityKey = contentBlock.getEntityAt(0);
  if (entityKey) {
    const editorState = getEditorState();
    const contentState = editorState.getCurrentContent();
    const entityData = contentState.getEntity(entityKey).getData();
    const data = typeof getNewData === 'function' ? cloneDeep(getNewData(entityData)) : cloneDeep(getNewData);
    contentState.replaceEntityData(entityKey, data);
    data.config.key = contentBlock.getKey();
    console.log('setData for ' + entityKey + ' key ' + contentBlock.getKey(), data);

    setEditorState(editorState);
    //Ronny: don't select the block after adding it
    // const newSelection = new SelectionState({
    //   anchorKey: contentBlock.key,
    //   anchorOffset: 0,
    //   focusKey: contentBlock.key,
    //   focusOffset: 0,
    // });
    // setEditorState(EditorState.forceSelection(editorState, newSelection));
  }
};

const setData = (contentBlock, { getEditorState, setEditorState }) => {
  return newDataFunc => updateEntityData(contentBlock, { getEditorState, setEditorState }, newDataFunc);
};

const getData = (contentBlock, { getEditorState }) => {
  return () => {
    const contentState = getEditorState().getCurrentContent();
    const entity = contentState.getEntity(contentBlock.getEntityAt(0));
    const entityKey = contentBlock.getEntityAt(0);
    // console.log('getData for ' + entityKey + ' key ' + contentBlock.getKey(), entity.getData());
    return entity.getData();
  }
};

const deleteEntity = (contentBlock, { getEditorState, setEditorState }) => {
  return () => {
    const blockKey = contentBlock.getKey();
    const editorState = getEditorState();
    const contentState = editorState.getCurrentContent();
    const block = contentState.getBlockForKey(blockKey);
    const previousBlock = contentState.getBlockBefore(blockKey);
    const selectionRange = new SelectionState({
      anchorOffset: previousBlock.text.length,
      anchorKey: previousBlock.key,
      focusOffset: block.text.length,
      focusKey: blockKey,
    });
    const newContentState = Modifier.removeRange(contentState, selectionRange, 'forward');
    const newEditorState = EditorState.push(editorState, newContentState, 'remove-range');
    setEditorState(newEditorState);
  }
};

const createBasePlugin = (config = {}) => {
  const pubsub = Pubsub();
  const helpers =  config.helpers || {};
  const theme = config.theme || {};
  const Toolbar = createToolbar({buttons: config.toolbar.InlineButtons, theme, pubsub, helpers});
  const InsertPluginButtons = config.toolbar.InsertButtons.map(button => createInsertPluginButton({ blockType: config.type, button, pubsub}));
  const PluginComponent = (config.decorator) ? config.decorator(config.component) : config.component;

  const CompWithBase = createBaseComponent({PluginComponent, theme, pubsub, helpers});

  return {
    blockRendererFn: (contentBlock, { getEditorState, setEditorState, getReadOnly }) => {
      if (contentBlock.getType() === 'atomic') {
        // TODO subject to change for draft-js next release
        const contentState = getEditorState().getCurrentContent();
        const key = contentBlock.getEntityAt(0);
        if (key) {
          const entity = contentState.getEntity(key);
          const type = entity.getType();
          const pluginTypes = [config.type, config.legacyType];
          if (includes(pluginTypes, type)) {
            return {
              component: CompWithBase,
              editable: false,
              props: {
                getData: getData(contentBlock, { getEditorState }),
                setData: setData(contentBlock, { getEditorState, setEditorState }),
                deleteBlock: deleteEntity(contentBlock, { getEditorState, setEditorState }),
                readOnly: getReadOnly(),
              }
            };
          }
        }
      }
      return null;
    },
    Toolbar,
    InsertPluginButtons
  };
};


export default createBasePlugin;

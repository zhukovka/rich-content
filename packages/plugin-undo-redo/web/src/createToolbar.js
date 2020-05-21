import { EditorState } from 'wix-rich-content-editor-common';
import { UNDO_REDO_TYPE } from './types';
import UndoIcon from './icons/UndoIcon';
import RedoIcon from './icons/RedoIcon';
import createInsertButtons from './insert-buttons';
import UndoButton from './UndoButton';
import RedoButton from './RedoButton';
import React from 'react';

export default function createToolbar(config) {
  const { helpers, t, isMobile, settings, editorStateWrapper } = config;
  const TextButtonMapper = pubsub =>
    isMobile
      ? {
          Undo: {
            component: props => <UndoButton pubsub={pubsub} t={t} {...props} />,
            isMobile: true,
            externalizedButtonProps: {
              onClick: e => {
                e.preventDefault();
                config.setEditorState(EditorState.undo(config.getEditorState()));
              },
              isActive: () => false,
              icon: config[UNDO_REDO_TYPE]?.toolbar?.icons?.UndoButtonIcon || UndoIcon,
              tooltip: config.t('TextLinkButton_Tooltip'),
              name: 'undo',
              label: '', // new key needed?
              buttonType: 'button',
            },
          },
          Redo: {
            component: props => <RedoButton pubsub={pubsub} t={t} {...props} />,
            isMobile: true,
            externalizedButtonProps: {
              onClick: e => {
                e.preventDefault();
                config.setEditorState(EditorState.redo(config.getEditorState()));
              },
              isActive: () => false,
              icon: config[UNDO_REDO_TYPE]?.toolbar?.icons?.RedoButtonIcon || RedoIcon,
              tooltip: config.t('TextLinkButton_Tooltip'),
              name: 'redo',
              label: '', // new key needed?
              buttonType: 'button',
            },
          },
        }
      : {};
  return {
    TextButtonMapper,
    InsertButtons: createInsertButtons({
      helpers,
      t,
      isMobile,
      settings,
      UndoButton,
      RedoButton,
      editorStateWrapper,
    }),
    name: 'undo-redo',
  };
}

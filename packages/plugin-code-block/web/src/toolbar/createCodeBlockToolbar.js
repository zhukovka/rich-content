// @flow
import { MODIFIERS } from 'wix-rich-content-editor-common';
import TextCodeBlockButton from './TextCodeBlockButton';
import { CODE_BLOCK_TYPE } from '../types';
import { hasBlockType, toggleBlockTypeAndEnsureSpaces } from './blockTypeModifiers';
import createInsertButtons from './codeBlockInsertButtons';
import CodeBlockIcon from '../icons/CodeBlockIcon';

const codeBlockTexButtontMapper /*: TextButtonMapper */ = config => {
  const { getEditorState, setEditorState, helpers, t } = config;
  const icon = config[CODE_BLOCK_TYPE]?.toolbar?.icons?.InsertPluginButtonIcon || CodeBlockIcon;
  const commandHandler = editorState => {
    setEditorState(toggleBlockTypeAndEnsureSpaces(CODE_BLOCK_TYPE, editorState));
  };

  return {
    TextButtonMapper: () => ({
      CodeBlock: {
        component: TextCodeBlockButton,
        isMobile: true,
        keyBindings: [
          {
            keyCommand: {
              command: 'code-block',
              modifiers: [MODIFIERS.COMMAND],
              key: '0',
            },
            commandHandler,
          },
        ],
        externalizedButtonProps: {
          onClick: e => {
            e.preventDefault();
            setEditorState(toggleBlockTypeAndEnsureSpaces(CODE_BLOCK_TYPE, getEditorState()));
          },
          isActive: () => hasBlockType(CODE_BLOCK_TYPE, getEditorState()),
          icon,
          tooltip: config.t('TextCodeBlockButton_Tooltip'),
          label: '', // new key needed?
          buttonType: 'button',
        },
      },
    }),
    InsertButtons: createInsertButtons({ helpers, t, addBlockHandler: commandHandler, icon }),
    name: CODE_BLOCK_TYPE,
  };
};

export default codeBlockTexButtontMapper;

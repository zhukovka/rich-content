import React from 'react';
import {
  MODIFIERS,
  hasLinksInSelection,
  removeLinksInSelection,
  EditorModals,
  getModalStyles,
  insertLinkAtCurrentSelection,
  updateLinkAtCurrentSelection,
} from 'wix-rich-content-editor-common';
import TextLinkButton from './TextLinkButton';
import RemoveLinkButton from './RemoveLinkButton';
import UrlLinkButton from './UrlLinkButton';
import { EditIcon } from '../icons';

const openLinkModal = ({
  helpers,
  isMobile,
  anchorTarget,
  relValue,
  t,
  theme,
  getEditorState,
  setEditorState,
  uiSettings,
}) => {
  const modalStyles = getModalStyles({ fullScreen: false, isMobile });
  if (helpers && helpers.openModal) {
    const modalProps = {
      helpers,
      modalStyles,
      isMobile,
      getEditorState,
      setEditorState,
      t,
      theme,
      anchorTarget,
      relValue,
      modalName: EditorModals.MOBILE_TEXT_LINK_MODAL,
      hidePopup: helpers.closeModal,
      uiSettings,
    };
    helpers.openModal(modalProps);
  } else {
    //eslint-disable-next-line no-console
    console.error(
      'Link plugin: failed to display Link modal dialog since helpers.openModal is not defined'
    );
  }
};

export default config => ({
  TextButtonMapper: () => ({
    Link: {
      component: props => (
        <TextLinkButton
          insertLinkFn={insertLinkAtCurrentSelection}
          isActive={hasLinksInSelection(config.getEditorState())}
          {...props}
        />
      ),
      isMobile: true,
      position: { mobile: 5 },
      keyBindings: [
        {
          keyCommand: {
            command: 'link',
            modifiers: [MODIFIERS.COMMAND],
            key: 'k',
          },
          commandHandler: editorState => {
            if (hasLinksInSelection(editorState)) {
              return removeLinksInSelection(editorState);
            } else {
              openLinkModal(config);
            }
          },
        },
      ],
    },
  }),
  InlinePluginButtons: () => ({
    UrlLinkButton: {
      component: UrlLinkButton,
      isMobile: true,
      position: { mobile: 5 },
    },
    Link: {
      component: props => (
        <TextLinkButton insertLinkFn={updateLinkAtCurrentSelection} icon={EditIcon} {...props} />
      ),
      isMobile: true,
      position: { mobile: 5 },
    },
    RemoveLink: {
      component: RemoveLinkButton,
      isMobile: true,
      position: { mobile: 5 },
    },
  }),
  name: 'link',
});

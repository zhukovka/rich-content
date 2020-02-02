import {
  MODIFIERS,
  hasEntityInSelectionByType,
  removeLinksInSelection,
  EditorModals,
  getModalStyles,
} from 'wix-rich-content-editor-common';
import TextAnchorButton from './TextAnchorButton';

const openAnchorModal = ({
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
      modalName: EditorModals.MOBILE_TEXT_ANCHOR_MODAL,
      hidePopup: helpers.closeModal,
      uiSettings,
    };
    helpers.openModal(modalProps);
  } else {
    //eslint-disable-next-line no-console
    console.error(
      'Anchor plugin: failed to display Anchor modal dialog since helpers.openModal is not defined'
    );
  }
};

export default config => ({
  TextButtonMapper: () => ({
    Anchor: {
      component: TextAnchorButton,
      isMobile: true,
      position: { mobile: 5 },
      keyBindings: [
        {
          keyCommand: {
            command: 'anchor',
            modifiers: [MODIFIERS.COMMAND, MODIFIERS.SHIFT],
            key: 'k',
          },
          commandHandler: editorState => {
            if (hasEntityInSelectionByType(editorState, 'wix-draft-plugin-anchor')) {
              return removeLinksInSelection(editorState, 'wix-draft-plugin-anchor');
            } else {
              openAnchorModal(config);
            }
          },
        },
      ],
    },
  }),
});

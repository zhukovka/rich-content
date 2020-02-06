import { TrashIcon, BUTTONS } from 'wix-rich-content-editor-common';
import { convertLinkPreviewToLink } from '../lib/utils';

export default (setEditorState, getEditorState) => {
  return [
    { keyName: 'link', type: BUTTONS.LINK_PREVIEW, mobile: false },
    {
      keyName: 'delete',
      type: 'custom',
      icon: TrashIcon,
      onClick: () => {
        const editorState = getEditorState();
        setEditorState(convertLinkPreviewToLink(editorState));
      },
      mobile: true,
      desktop: true,
    },
  ];
};

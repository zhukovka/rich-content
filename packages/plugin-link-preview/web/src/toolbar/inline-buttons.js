import { BUTTONS } from 'wix-rich-content-editor-common';
import { convertLinkPreviewToLink } from '../lib/utils';
import { ConvertToLinkIcon } from '../icons';

export default (setEditorState, getEditorState) => {
  return [
    { keyName: 'link', type: BUTTONS.LINK_PREVIEW, mobile: false },
    {
      keyName: 'replaceToLink',
      type: 'custom',
      icon: ConvertToLinkIcon,
      onClick: () => {
        const editorState = getEditorState();
        setEditorState(convertLinkPreviewToLink(editorState));
      },
      mobile: true,
      desktop: true,
    },
    { keyName: 'delete', type: BUTTONS.DELETE, mobile: true },
  ];
};

import { TrashIcon } from 'wix-rich-content-editor-common';
export default (settings, setEditorState) => [
  {
    keyName: 'deletePreview',
    type: 'custom',
    icon: TrashIcon,
    onClick: () => {
      settings.onDelete(setEditorState);
    },
    mobile: true,
    desktop: true,
  },
];

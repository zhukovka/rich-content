import { TrashIcon } from 'wix-rich-content-editor-common';
export default settings => [
  {
    keyName: 'deletePreview',
    type: 'custom',
    icon: TrashIcon,
    onClick: () => {
      settings?.onDelete();
    },
    mobile: true,
    desktop: true,
  },
];

import { BUTTONS } from 'wix-rich-content-editor-common';

export default () => {
  return [
    { keyName: 'sizeSmall', type: BUTTONS.SIZE_SMALL },
    { keyName: 'sizeMedium', type: BUTTONS.SIZE_MEDIUM },
    { keyName: 'separator1', type: BUTTONS.SEPARATOR, mobile: true },
    {
      keyName: 'anchor',
      type: BUTTONS.FLOATING_MODAL,
      mobile: false,
    },
    { keyName: 'separator2', type: BUTTONS.SEPARATOR, mobile: true },
    { keyName: 'delete', type: BUTTONS.DELETE, mobile: true },
  ];
};

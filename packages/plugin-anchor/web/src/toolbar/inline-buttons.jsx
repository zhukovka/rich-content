import { BUTTONS } from 'wix-rich-content-editor-common';

export default () => {
  return [
    {
      keyName: 'anchor',
      type: BUTTONS.FLOATING_MODAL,
      mobile: true,
    },
    { keyName: 'separator1', type: BUTTONS.SEPARATOR, mobile: true },
    { keyName: 'delete', type: BUTTONS.DELETE, mobile: true },
  ];
};

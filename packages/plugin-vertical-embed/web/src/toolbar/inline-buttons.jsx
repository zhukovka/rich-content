import { BUTTONS } from 'wix-rich-content-editor-common';

export default () => {
  //TODO this should use LinkPreview toolbar
  return [
    { keyName: 'separator2', type: BUTTONS.SEPARATOR, mobile: true },
    { keyName: 'delete', type: BUTTONS.DELETE, mobile: true },
  ];
};

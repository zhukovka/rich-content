import { BUTTONS, AlignCenterIcon, SizeLargeIcon } from 'wix-rich-content-editor-common';
import { changeAlignmentMobile, changeSizeMobile } from './actions';
import { isAlignmentDisabled, getNextSizeIcon, getNextAlignmentIcon } from './selectors';

export default ({ styles, settings }) => {
  const icons = settings && settings.toolbar && settings.toolbar.icons || {};
  return [
    { keyName: 'sizeSmall', type: BUTTONS.SIZE_SMALL },
    { keyName: 'sizeMedium', type: BUTTONS.SIZE_MEDIUM },
    { keyName: 'sizeLarge', type: BUTTONS.SIZE_LARGE },
    {
      keyName: 'sizeMobile',
      type: 'custom',
      icon: icons.sizeMobile || SizeLargeIcon,
      onClick: changeSizeMobile,
      mobile: true,
      desktop: false,
      mapComponentDataToButtonProps: componentData => ({
        icon: getNextSizeIcon(componentData),
      }),
    },
    { keyName: 'separator2', type: BUTTONS.SEPARATOR, mobile: true },
    {
      keyName: 'alignLeft',
      type: BUTTONS.TEXT_ALIGN_LEFT,
      mapComponentDataToButtonProps: componentData => ({
        disabled: isAlignmentDisabled(componentData),
      }),
    },
    { keyName: 'alignCenter', type: BUTTONS.TEXT_ALIGN_CENTER },
    {
      keyName: 'alignRight',
      type: BUTTONS.TEXT_ALIGN_RIGHT,
      mapComponentDataToButtonProps: componentData => ({
        disabled: isAlignmentDisabled(componentData),
      }),
    },
    {
      keyName: 'alignMobile',
      type: 'custom',
      icon: icons.alignMobile || AlignCenterIcon,
      onClick: changeAlignmentMobile,
      mobile: true,
      desktop: false,
      mapComponentDataToButtonProps: componentData => ({
        icon: getNextAlignmentIcon(componentData),
        disabled: isAlignmentDisabled(componentData),
      }),
    },
    { keyName: 'separator3', type: BUTTONS.SEPARATOR, mobile: true },
    { keyName: 'delete', type: BUTTONS.DELETE, mobile: true },
  ];
};

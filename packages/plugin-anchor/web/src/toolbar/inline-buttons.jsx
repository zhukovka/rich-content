import {
  BUTTONS,
  PluginSettingsIcon,
  getModalStyles,
  // AlignCenterIcon,
  // SizeLargeIcon,
} from 'wix-rich-content-editor-common';
import { Modals } from '../modals';
// import { changeType, changeAlignmentMobile, changeSizeMobile } from './actions';
// import { isAlignmentDisabled, getNextSizeIcon, getNextAlignmentIcon } from './selectors';
// import { getDropdownOptions, createDropdownValueGetter } from './dropdown-options';

export default ({ t, uiSettings, /*styles,*/ settings, /*isMobile,*/ anchorTarget, relValue }) => {
  // const dropdownOptions = getDropdownOptions(styles);
  const icons = settings?.toolbar?.icons || {};
  // const modalStyles = getModalStyles({ isMobile });
  const anchorModalStyles = getModalStyles({
    customStyles: {
      content: { width: 'fit-content', height: 'fit-content', top: '90px', left: '90px' },
    },
  });
  return [
    // {
    //   keyName: 'type',
    //   type: BUTTONS.DROPDOWN,
    //   // options: dropdownOptions,
    //   // onChange: changeType,
    //   // getValue: createDropdownValueGetter(dropdownOptions),
    //   // controlClassName: styles['divider-dropdown__control'],
    //   tooltipTextKey: 'TextAnchorButton_Tooltip',
    //   mobile: true,
    // },
    { keyName: 'sizeSmall', type: BUTTONS.SIZE_SMALL },
    { keyName: 'sizeMedium', type: BUTTONS.SIZE_MEDIUM },
    { keyName: 'separator1', type: BUTTONS.SEPARATOR, mobile: true },
    { keyName: 'link', type: BUTTONS.LINK, mobile: false },
    {
      keyName: 'settings',
      type: BUTTONS.EXTERNAL_MODAL,
      icon: icons.settings || PluginSettingsIcon,
      modalName: Modals.ANCHOR_SETTINGS,
      modalStyles: anchorModalStyles,
      anchorTarget,
      relValue,
      t,
      mobile: true,
      tooltipTextKey: 'SettingsButton_Tooltip',
      uiSettings,
    },
    { keyName: 'delete', type: BUTTONS.DELETE, mobile: true },
  ];
};

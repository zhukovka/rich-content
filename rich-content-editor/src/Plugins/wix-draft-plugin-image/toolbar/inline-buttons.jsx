import { BUTTONS } from '~/Plugins/base/buttons';
import { getModalStyles } from '~/Utils';
import MediaReplaceIcon from '../icons/toolbar/media-replace.svg';
import SettingsIcon from '../../base/icons/block-settings.svg';

const modalStyles = getModalStyles();

const InlineButtons = [
  { type: BUTTONS.SIZE_ORIGINAL_CENTER, mobile: true },
  { type: BUTTONS.SIZE_SMALL_LEFT, mobile: true },
  { type: BUTTONS.SIZE_SMALL_CENTER, mobile: true },
  { type: BUTTONS.SIZE_SMALL_RIGHT, mobile: true },
  { type: BUTTONS.SIZE_CONTENT, mobile: true },
  { type: BUTTONS.SIZE_FULL_WIDTH, mobile: true },
  { type: BUTTONS.SEPARATOR, mobile: true },
  // {
  //   keyName: 'settings',
  //   type: BUTTONS.PANEL,
  //   panelElement: SettingsModal,
  //   icon: SettingsIcon,
  //   onClick: pubsub => console.log('*** click settings *** '), //eslint-disable-line no-console, no-unused-vars,
  // },
  {
    keyName: 'settings',
    type: BUTTONS.EXTERNAL_MODAL,
    icon: SettingsIcon,
    modalElement: ImageSettings,
    modalStyles,
    mobile: true,
  },
  { type: BUTTONS.LINK, mobile: true },
  {
    keyName: 'replace',
    type: BUTTONS.FILES,
    icon: MediaReplaceIcon,
    mobile: true,
  },
  { type: BUTTONS.DELETE, mobile: true },
];

export default InlineButtons;

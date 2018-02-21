// import AddIcon from '../icons/toolbar/icon-add.svg';
import ManageMediaIcon from '../icons/insert-plugin.svg';
import AdvancedSettingsIcon from '../../base/icons/block-settings.svg';
import GallerySettingsModal from '../components/gallery-settings-modal';
import { BUTTONS } from '~/Plugins/base/buttons';
import { getModalStyles } from '~/Utils';

const modalStyles = getModalStyles();

const InlineButtons = [
  // {
  //   keyName: 'add',
  //   type: BUTTONS.FILES,
  //   icon: AddIcon,
  //   onClick: pubsub => console.log('*** click add *** '), //eslint-disable-line no-console, no-unused-vars,
  //   onFilesSelected: (pubsub, files) => console.log('*** got files *** ', files), //eslint-disable-line no-console, no-unused-vars,
  //   mobile: true,
  // },
  // { type: BUTTONS.SEPARATOR, mobile: true },
  { type: BUTTONS.SIZE_SMALL_LEFT, mobile: true },
  { type: BUTTONS.SIZE_SMALL_CENTER, mobile: true },
  { type: BUTTONS.SIZE_SMALL_RIGHT, mobile: true },
  { type: BUTTONS.SIZE_CONTENT, mobile: true },
  { type: BUTTONS.SIZE_FULL_WIDTH, mobile: true },
  { type: BUTTONS.SEPARATOR, mobile: true },
  {
    keyName: 'manage_media',
    type: BUTTONS.EXTERNAL_MODAL,
    icon: ManageMediaIcon,
    modalElement: GallerySettingsModal,
    activeTab: 'manage_media',
    modalStyles,
    mobile: true,
  },
  {
    keyName: 'advanced_settings',
    type: BUTTONS.EXTERNAL_MODAL,
    icon: AdvancedSettingsIcon,
    modalElement: GallerySettingsModal,
    activeTab: 'advanced_settings',
    modalStyles,
    mobile: true,
  },
  { type: BUTTONS.DELETE, mobile: true },
];

export default InlineButtons;

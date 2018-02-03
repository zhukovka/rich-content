import AddIcon from '../icons/toolbar/icon-add.svg';
import ManageMediaIcon from '../icons/insert-plugin.svg';
import AdvancedSettingsIcon from '../../base/icons/block-settings.svg';
import GallerySettingsModal from '../components/gallery-settings-modal';
import { BUTTONS } from '~/Plugins/base/buttons';
import { getModalStyles } from '../../../Common/defaultModalStyles';

const modalStyles = getModalStyles();

const InlineButtons = [
  {
    keyName: 'add',
    type: BUTTONS.FILES,
    icon: AddIcon,
    onClick: pubsub => console.log('*** click add *** '), //eslint-disable-line no-console, no-unused-vars,
    onFilesSelected: (pubsub, files) => console.log('*** got files *** ', files), //eslint-disable-line no-console, no-unused-vars,
  },
  { type: BUTTONS.SEPARATOR },
  { type: BUTTONS.SIZE_SMALL_LEFT },
  { type: BUTTONS.SIZE_SMALL_CENTER },
  { type: BUTTONS.SIZE_SMALL_RIGHT },
  { type: BUTTONS.SIZE_CONTENT },
  { type: BUTTONS.SIZE_FULL_WIDTH },
  { type: BUTTONS.SEPARATOR },
  {
    keyName: 'manage_media',
    type: BUTTONS.EXTERNAL_MODAL,
    icon: ManageMediaIcon,
    modalElement: GallerySettingsModal,
    activeTab: 'manage_media',
    modalStyles,
  },
  {
    keyName: 'advanced_settings',
    type: BUTTONS.EXTERNAL_MODAL,
    icon: AdvancedSettingsIcon,
    modalElement: GallerySettingsModal,
    activeTab: 'advanced_settings',
    modalStyles,
  },
  { type: BUTTONS.DELETE },
];

export default InlineButtons;

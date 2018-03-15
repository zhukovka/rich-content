import AddIcon from '../icons/toolbar/icon-upload.svg';
import ManageMediaIcon from '../icons/manageMedia.svg';
import AdvancedSettingsIcon from '~/Plugins/base/icons/block-settings.svg';
import { BUTTONS } from '~/Plugins/base/buttons';
import { MODALS } from '~/RichContentEditor/RichContentModal';
import { getModalStyles } from '~/Utils';
import { galleryLayoutsDropdown, switchLayout, getCurrentLayout } from '../helpers';

const modalStyles = getModalStyles();
export default({ t }) => {
  return [
    {
      keyName: 'add',
      type: BUTTONS.FILES,
      icon: AddIcon,
      onFilesSelected: (pubsub, files) => {
        if (files.length > 0) {
          const handleFilesSelected = pubsub.store.get('handleFilesSelected');
          handleFilesSelected(files);
        }
      },
      mobile: false,
      multiple: true,
      tooltipTextKey: 'UploadMediaButton_Tooltip',
    },
    { type: BUTTONS.SEPARATOR, mobile: false },
    {
      keyName: 'layout',
      type: BUTTONS.DROPDOWN,
      options: galleryLayoutsDropdown(t),
      onChange: switchLayout,
      getValue: getCurrentLayout,
      mobile: true,
    },
    { type: BUTTONS.SEPARATOR, mobile: false },
    { type: BUTTONS.SIZE_SMALL_CENTER, mobile: false },
    { type: BUTTONS.SIZE_CONTENT, mobile: false },
    { type: BUTTONS.SIZE_FULL_WIDTH, mobile: false },
    { type: BUTTONS.SEPARATOR, mobile: false },
    { type: BUTTONS.SIZE_SMALL_LEFT, mobile: false },
    { type: BUTTONS.SIZE_SMALL_RIGHT, mobile: false },
    { type: BUTTONS.SEPARATOR, mobile: false },
    {
      keyName: 'manage_media',
      type: BUTTONS.EXTERNAL_MODAL,
      icon: ManageMediaIcon,
      modalName: MODALS.GALLERY_SETTINGS,
      activeTab: 'manage_media',
      modalStyles,
      t,
      mobile: true,
      tooltipTextKey: 'ManageMediaButton_Tooltip',
    },
    {
      keyName: 'advanced_settings',
      type: BUTTONS.EXTERNAL_MODAL,
      icon: AdvancedSettingsIcon,
      modalName: MODALS.GALLERY_SETTINGS,
      activeTab: 'advanced_settings',
      modalStyles,
      switchLayout,
      t,
      mobile: false,
      tooltipTextKey: 'SettingsButton_Tooltip',
    },
    { type: BUTTONS.DELETE, mobile: true },
  ];
};

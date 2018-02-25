import React from 'react';
import PropTypes from 'prop-types';
import ImageSettingsModal from '~/Plugins/wix-draft-plugin-image/toolbar/image-settings';
import GallerySettingsModal from '~/Plugins/wix-draft-plugin-gallery/components/gallery-settings-modal';
import HTMLSettingsModal from '~/Plugins/wix-draft-plugin-html/toolbar/html-settings';
import MobileAddPluginModal from './Toolbars/AddPluginModal';

const KEYS = {
  IMAGE_SETTINGS: 'image-settings',
  GALLERY_SETTINGS: 'gallery-settings',
  HTML_SETTINGS: 'html-settings',
  MOBILE_ADD_PLUGIN: 'mobile-add-plugin',
};

const Modals = {
  [KEYS.IMAGE_SETTINGS]: ImageSettingsModal,
  [KEYS.GALLERY_SETTINGS]: GallerySettingsModal,
  [KEYS.HTML_SETTINGS]: HTMLSettingsModal,
  [KEYS.MOBILE_ADD_PLUGIN]: MobileAddPluginModal,
};

const RichContentModal = ({ modalName, modalElement, ...modalProps }) => {
  const ModalElement = Modals[modalName] || modalElement;
  if (!ModalElement) {
    console.error(`Attempted to open unknown external modal '${modalName}'`); //eslint-disable-line no-console
    return null;
  }
  return <ModalElement {...modalProps} />;
};

RichContentModal.propTypes = {
  modalName: PropTypes.string,
  modalElement: PropTypes.func,
  modalProps: PropTypes.object,
};

export default RichContentModal;
export { KEYS as MODALS };

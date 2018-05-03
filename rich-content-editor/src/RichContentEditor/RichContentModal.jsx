import React from 'react';
import PropTypes from 'prop-types';
import { MODALS } from 'wix-rich-content-common';
import FocusTrap from 'focus-trap-react';
import MobileAddPluginModal from './Toolbars/AddPluginModal';
import MobileBlockLinkModal from './Toolbars/MobileBlockLinkModal';
import MobileTextLinkModal from './Toolbars/MobileTextLinkModal';

const Modals = {
  [MODALS.MOBILE_ADD_PLUGIN]: MobileAddPluginModal,
  [MODALS.MOBILE_BLOCK_LINK_MODAL]: MobileBlockLinkModal,
  [MODALS.MOBILE_TEXT_LINK_MODAL]: MobileTextLinkModal,
};

const RichContentModal = ({ modalName, modalElement, ...modalProps }) => {
  const ModalElement = Modals[modalName] || modalElement;
  if (!ModalElement) {
    console.error(`Attempted to open unknown external modal '${modalName}'`); //eslint-disable-line no-console
    return null;
  }
  return (
    <FocusTrap>
      <ModalElement {...modalProps} />
    </FocusTrap>);
};

RichContentModal.propTypes = {
  modalName: PropTypes.string,
  modalElement: PropTypes.func,
  modalProps: PropTypes.object,
};

export default RichContentModal;

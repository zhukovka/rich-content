import React from 'react';
import PropTypes from 'prop-types';
import { FocusManager } from '../Components/FocusManager';

const RichContentModal = ({ modalElement, ...modalProps }) => {

  return (
    <FocusManager>
      <modalElement {...modalProps} />
    </FocusManager>);
};

RichContentModal.propTypes = {
  modalElement: PropTypes.func,
  modalProps: PropTypes.object,
};

export default RichContentModal;

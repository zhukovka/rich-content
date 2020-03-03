import React from 'react';
import PropTypes from 'prop-types';
import InlineToolbarButton from './InlineToolbarButton';
import { TrashIcon } from '../Icons';

const RemoveLinkToolbarButton = ({ icon, ...otherProps }) => (
  <InlineToolbarButton
    icon={icon || TrashIcon}
    dataHook={'RemoveLinkToolbarButton'}
    {...otherProps}
  />
);

RemoveLinkToolbarButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  theme: PropTypes.object.isRequired,
  isMobile: PropTypes.bool,
  tooltipText: PropTypes.string,
  tabIndex: PropTypes.number,
  icon: PropTypes.func,
};

export default RemoveLinkToolbarButton;

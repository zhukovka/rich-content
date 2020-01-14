import React from 'react';
import PropTypes from 'prop-types';
import InlineToolbarButton from './InlineToolbarButton';
import { AnchorIcon } from '../Icons';

const AnchorButton = ({ icon, ...otherProps }) => (
  <InlineToolbarButton icon={icon || AnchorIcon} dataHook={'AnchorButton'} {...otherProps} />
);

AnchorButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  theme: PropTypes.object.isRequired,
  isMobile: PropTypes.bool,
  tooltipText: PropTypes.string,
  tabIndex: PropTypes.number,
  icon: PropTypes.func,
};

export default AnchorButton;

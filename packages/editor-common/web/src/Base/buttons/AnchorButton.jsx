import React from 'react';
import PropTypes from 'prop-types';
import PluginSettingsIcon from '../../Icons/PluginSettingsIcon';
import InlineToolbarButton from '../../Components/InlineToolbarButton';

const AnchorButton = ({ icon, ...otherProps }) => (
  <InlineToolbarButton
    icon={icon || PluginSettingsIcon}
    dataHook={'AnchorButton'}
    {...otherProps}
  />
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

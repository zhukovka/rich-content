import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import style from '~/Styles/settings-section.scss';

const SettingsSection = props => <div className={classnames(style.section, props.className)}>{props.children}</div>;
SettingsSection.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default SettingsSection;

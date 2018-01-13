import React from 'react';
import PropTypes from 'prop-types';

import style from './settings-section.scss';

export const SettingsSection = props => <div className={style.section}>{props.children}</div>;
SettingsSection.propTypes = {
  children: PropTypes.node,
};

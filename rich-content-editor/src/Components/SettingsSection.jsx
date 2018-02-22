import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from '~/Styles/settings-section.scss';
import { mergeStyles } from '~/Utils/mergeStyles';

class SettingsSection extends React.Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  render() {
    const { styles } = this;
    return <div className={classnames(styles.section, this.props.className)}>{this.props.children}</div>;
  }
}

SettingsSection.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  theme: PropTypes.object.isRequired,
};

export default SettingsSection;

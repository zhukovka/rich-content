import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles } from '../Utils/mergeStyles';
import styles from '../Styles/settings-section.scss';

class SettingsSection extends React.Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  render() {
    const { styles } = this;
    return <div className={classNames(styles.section, this.props.className)}>{this.props.children}</div>;
  }
}

SettingsSection.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  theme: PropTypes.object.isRequired,
};

export default SettingsSection;

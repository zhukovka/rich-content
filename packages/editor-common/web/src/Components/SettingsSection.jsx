import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/settings-section.scss';
import Tooltip from './Tooltip';
import { isEmpty } from 'lodash';

class SettingsSection extends React.Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  render() {
    const { styles } = this;
    const {
      children,
      ariaProps,
      className,
      tooltipText,
      tooltipOffset,
      theme,
      shouldRefreshTooltips,
    } = this.props;

    const showTooltip = !isEmpty(tooltipText);
    const setting = (
      <div className={classNames(styles.section, className)} {...ariaProps}>
        {children}
      </div>
    );
    if (!showTooltip) {
      return setting;
    }
    return (
      <Tooltip
        content={tooltipText}
        moveBy={tooltipOffset}
        theme={theme}
        shouldRebuildOnUpdate={shouldRefreshTooltips}
      >
        {setting}
      </Tooltip>
    );
  }
}

SettingsSection.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  theme: PropTypes.object.isRequired,
  ariaProps: PropTypes.object,
  tooltipText: PropTypes.string,
  tooltipOffset: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  shouldRefreshTooltips: PropTypes.func,
};

export default SettingsSection;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import Tooltip from '~/Components/Tooltip';

import { mergeStyles } from '~/Utils';
import styles from '~/Styles/inline-toolbar-button.scss';

export default class TextButton extends Component {

  constructor(props) {
    super(props);
    const { buttonStyles } = props.theme || {};
    this.styles = mergeStyles({ styles, theme: buttonStyles });
  }

  static propTypes = {
    icon: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    isActive: PropTypes.func,
    theme: PropTypes.object.isRequired,
    isMobile: PropTypes.bool,
    tooltipText: PropTypes.string,
  };

  isActive = () => {
    const { isActive } = this.props;
    return isActive ? isActive() : false;
  }

  handleClick = event => {
    const { onClick } = this.props;
    onClick && onClick(event);
  }

  preventBubblingUp = event => event.preventDefault();

  render() {
    const { styles } = this;
    const { icon: Icon, theme, isMobile, tooltipText } = this.props;
    const showTooltip = !isMobile && !isEmpty(tooltipText);
    const iconClassNames = classNames(
      styles.inlineToolbarButton_icon,
      {
        [styles.inlineToolbarButton_active]: this.isActive(),
      }
    );

    const textButton = (
      <div className={styles.inlineToolbarButton_wrapper} onMouseDown={this.preventBubblingUp}>
        <button className={styles.inlineToolbarButton} onClick={this.handleClick}>
          <div className={iconClassNames}>
            <Icon />
          </div>
        </button>
      </div>
    );

    if (showTooltip) {
      return (
        <Tooltip
          content={tooltipText}
          moveBy={{ x: 10, y: 5 }}
          theme={theme}
        >
          {textButton}
        </Tooltip>
      );
    } else {
      return textButton;
    }
  }
}

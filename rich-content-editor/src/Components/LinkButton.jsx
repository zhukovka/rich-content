import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import Tooltip from '~/Components/Tooltip';

import { mergeStyles } from '~/Utils';
import LinkIcon from '~/RichContentEditor/Toolbars/icons/link.svg';
import styles from '~/Styles/inline-toolbar-button.scss';

export default class LinkButton extends Component {

  constructor(props) {
    super(props);
    const { buttonStyles } = props.theme || {};
    this.styles = mergeStyles({ styles, theme: buttonStyles });
  }

  static propTypes = {
    onClick: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired,
    theme: PropTypes.object.isRequired,
    isMobile: PropTypes.bool,
    tooltipText: PropTypes.string,
  };

  handleClick = () => this.props.onClick && this.props.onClick();

  preventBubblingUp = event => event.preventDefault();

  render() {
    const { isActive, theme, isMobile, tooltipText } = this.props;
    const { styles } = this;
    const showTooltip = !isMobile && !isEmpty(tooltipText);

    const iconClassNames = classNames(styles.inlineToolbarButton_icon,
      {
        [styles.inlineToolbarButton_active]: isActive,
      }
    );

    const linkButton = (
      <div className={styles.inlineToolbarButton_wrapper} onMouseDown={this.preventBubblingUp}>
        <button onClick={this.handleClick} className={styles.inlineToolbarButton}>
          <div className={iconClassNames}>
            <LinkIcon />
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
          {linkButton}
        </Tooltip>
      );
    } else {
      return linkButton;
    }
  }
}

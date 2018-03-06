import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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
  };

  handleClick = () => this.props.onClick && this.props.onClick();

  preventBubblingUp = event => event.preventDefault();

  render() {
    const { isActive } = this.props;
    const { styles } = this;

    const iconClassNames = classNames(styles.inlineToolbarButton_icon,
      {
        [styles.inlineToolbarButton_active]: isActive,
      }
    );

    return (
      <div className={styles.inlineToolbarButton_wrapper} onMouseDown={this.preventBubblingUp}>
        <button onClick={this.handleClick} className={styles.inlineToolbarButton}>
          <div className={iconClassNames}>
            <LinkIcon />
          </div>
        </button>
      </div>
    );
  }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { mergeStyles } from '~/Utils';
import LinkIcon from '~/RichContentEditor/Toolbars/icons/link.svg';
import styles from '~/Styles/inline-toolbar-button.scss';

export default class LinkButton extends Component {

  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
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

    const iconClassNames = isActive ? styles.active : styles.icon;
    return (
      <div className={styles.buttonWrapper} onMouseDown={this.preventBubblingUp}>
        <button onClick={this.handleClick} className={styles.button}>
          <div className={iconClassNames}>
            <LinkIcon />
          </div>
        </button>
      </div>
    );
  }
}

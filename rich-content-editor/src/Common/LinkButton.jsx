import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import LinkIcon from '~/RichContentEditor/Toolbars/icons/link.svg';
import Styles from '~/Styles/inline-toolbar-button.scss';

export default class LinkButton extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired,
    theme: PropTypes.object,
  };

  handleClick = () => this.props.onClick && this.props.onClick();

  preventBubblingUp = event => event.preventDefault();

  render() {
    const { theme, isActive } = this.props;

    const buttonWrapperClassNames = classNames(Styles.buttonWrapper, theme && theme.buttonWrapper);
    const buttonClassNames = classNames(Styles.button, theme && theme.button, {
      [Styles.active]: isActive,
    });
    const iconClassNames = classNames(Styles.icon, theme && theme.icon);
    return (
      <div className={buttonWrapperClassNames} onMouseDown={this.preventBubblingUp}>
        <button onClick={this.handleClick} className={buttonClassNames}>
          <div className={iconClassNames}>
            <LinkIcon />
          </div>
        </button>
      </div>
    );
  }
}

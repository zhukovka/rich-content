import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Styles from '~/Styles/inline-toolbar-button.scss';

export default class TextButton extends Component {
  static propTypes = {
    icon: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    isActive: PropTypes.bool,
    theme: PropTypes.object,
    value: PropTypes.any
  };

  isActive = () => this.props.isActive;

  handleClick = () => {
    const { onClick, value } = this.props;
    onClick && onClick(value);
  }

  preventBubblingUp = event => event.preventDefault();

  render() {
    const { icon: Icon, theme } = this.props;
    const buttonWrapperClassNames = classNames(Styles.buttonWrapper, theme && theme.buttonWrapper);
    const idleButtonClassNames = classNames(Styles.button, theme && theme.button);
    const activeButtonClassNames = classNames(idleButtonClassNames, Styles.active, theme && theme.active);
    const buttonClassNames = this.isActive() ? activeButtonClassNames : idleButtonClassNames;
    const iconClassNames = classNames(Styles.icon, theme && theme.icon);
    return (
      <div className={buttonWrapperClassNames} onMouseDown={this.preventBubblingUp}>
        <button className={buttonClassNames} onClick={this.handleClick}>
          <div className={iconClassNames}>
            <Icon />
          </div>
        </button>
      </div>
    );
  }
}

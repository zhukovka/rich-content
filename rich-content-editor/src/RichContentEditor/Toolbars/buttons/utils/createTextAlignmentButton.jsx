import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Styles from '~/Styles/inline-toolbar-button.scss';

export default ({ alignment, Icon }) =>
  class TextAlignmentButton extends Component {
    static propTypes = {
      alignment: PropTypes.string,
      onClick: PropTypes.func,
      theme: PropTypes.object,
    };

    isActive = () => this.props.alignment === alignment;

    handleClick = () => this.props.onClick && this.props.onClick(alignment);

    preventBubblingUp = event => event.preventDefault();

    render() {
      const { theme } = this.props;
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
  };

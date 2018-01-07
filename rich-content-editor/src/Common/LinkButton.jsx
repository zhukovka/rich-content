import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import LinkIcon from '~/RichContentEditor/Toolbars/icons/link.svg';
import buttonStyles from '~/Styles/text-toolbar-button.scss';

export default class LinkButton extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired,
    theme: PropTypes.object,
  };


  handleClick = () => this.props.onClick && this.props.onClick();

  preventBubblingUp = event => event.preventDefault();

  render() {
    const { isActive } = this.props;

    const buttonClassNames = classNames(
      buttonStyles.button,
      {
        [buttonStyles.active]: isActive,
      }
    );
    return (
      <div
        className={buttonStyles.buttonWrapper}
        onMouseDown={this.preventBubblingUp}
      >
        <button onClick={this.handleClick} className={buttonClassNames}>
          <LinkIcon/>
        </button>
      </div>
    );
  }
}

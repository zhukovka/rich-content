import React, { Component } from 'react';
import classNames from 'classnames';
import LinkIcon from '~/RichContentEditor/Toolbars/icons/link.svg';
import buttonStyles from '~/Styles/text-toolbar-button.scss';

class LinkButton extends Component {
  handleClick = () => this.props.onClick && this.props.onClick();

  preventBubblingUp = event => event.preventDefault();

  render() {
    const { onClick, isActive } = this.props;

    const buttonClassNames = classNames(
      buttonStyles.button,
      {
        [buttonStyles.active]: isActive,
      }
    )
    return (
      <div className={buttonStyles.buttonWrapper}
           onMouseDown={this.preventBubblingUp}
      >
        <button onClick={this.handleClick} className={buttonClassNames}>
          <LinkIcon />
        </button>
      </div>
    );
  }
}

export default LinkButton;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default ({ alignment, size, Icon }) =>
  class BlockAlignmentAndSizeButton extends Component {
    static propTypes = {
      setAlignmentAndSize: PropTypes.func.isRequired,
      alignment: PropTypes.string,
      size: PropTypes.string,
      theme: PropTypes.object.isRequired,
    };

    isActive = () => this.props.alignment === alignment && this.props.size === size;

    handleClick = () => this.props.setAlignmentAndSize(alignment, size);

    preventBubblingUp = event => {
      event.preventDefault();
    };

    render() {
      const { theme } = this.props;
      const className = this.isActive() ? classNames(theme.button, theme.active) : theme.button;
      return (
        <div className={theme.buttonWrapper} onMouseDown={this.preventBubblingUp}>
          <button className={className} onClick={this.handleClick}>
            <div className={theme.icon}>
              <Icon />
            </div>
          </button>
        </div>
      );
    }
  };

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default ({ Icon }) =>
  class BlockButton extends Component {
    static propTypes = {
      onClick: PropTypes.func.isRequired,
      theme: PropTypes.object,
    };

    handleClick = () => {
      const { onClick } = this.props;
      onClick && onClick();
    };

    preventBubblingUp = event => {
      event.preventDefault();
    };

    render() {
      const { theme } = this.props;
      return (
        <div className={theme.buttonWrapper} onMouseDown={this.preventBubblingUp}>
          <button className={theme.button} onClick={this.handleClick} type="button">
            <div className={theme.icon}>
              <Icon />
            </div>
          </button>
        </div>
      );
    }
  };

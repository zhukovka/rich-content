import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import Tooltip from '~/Components/Tooltip';

export default ({ Icon, tooltipTextKey }) =>
  class BlockButton extends Component {
    static propTypes = {
      onClick: PropTypes.func.isRequired,
      theme: PropTypes.object.isRequired,
      isMobile: PropTypes.bool,
      tooltipText: PropTypes.string,
      t: PropTypes.func,
    };

    handleClick = () => {
      const { onClick } = this.props;
      onClick && onClick();
    };

    preventBubblingUp = event => {
      event.preventDefault();
    };

    render() {
      const { theme, isMobile, t } = this.props;
      const tooltipText = t(tooltipTextKey);
      const showTooltip = !isMobile && !isEmpty(tooltipText);

      const blockButton = (
        <div className={theme.buttonWrapper} onMouseDown={this.preventBubblingUp}>
          <button className={theme.button} onClick={this.handleClick} type="button">
            <div className={theme.icon}>
              <Icon />
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
            {blockButton}
          </Tooltip>
        );
      } else {
        return blockButton;
      }
    }
  };

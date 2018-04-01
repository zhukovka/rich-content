import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import ToolbarButton from '~/Components/ToolbarButton';

export default ({ Icon, tooltipTextKey }) =>
  class BlockButton extends Component {
    static propTypes = {
      onClick: PropTypes.func,
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
      const textForHooks = tooltipText.replace(/\s+/, '');
      const dataHookText = `blockButton_${textForHooks}`;

      const blockButton = (
        <div className={theme.buttonWrapper} onMouseDown={this.preventBubblingUp}>
          <button className={theme.button} data-hook={dataHookText} onClick={this.handleClick} type="button">
            <div className={theme.icon}>
              <Icon />
            </div>
          </button>
        </div>
      );

      return <ToolbarButton theme={theme} showTooltip={showTooltip} tooltipText={tooltipText} button={blockButton} />;
    }
  };

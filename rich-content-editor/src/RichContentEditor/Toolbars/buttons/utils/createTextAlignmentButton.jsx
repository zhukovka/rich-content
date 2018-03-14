import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextButton from '../TextButton';

export default ({ alignment, Icon, tooltipTextKey }) =>
  class TextAlignmentButton extends Component {
    static propTypes = {
      alignment: PropTypes.string,
      onClick: PropTypes.func,
      theme: PropTypes.object.isRequired,
      isMobile: PropTypes.bool,
      t: PropTypes.func,
    };

    isActive = () => this.props.alignment === alignment;

    handleClick = () => this.props.onClick && this.props.onClick(alignment);

    render() {
      const { theme, isMobile, t } = this.props;
      const tooltipText = t(tooltipTextKey);
      return (
        <TextButton
          icon={Icon}
          theme={theme}
          isMobile={isMobile}
          isActive={this.isActive}
          onClick={this.handleClick}
          tooltipText={tooltipText}
        />
      );
    }

  };

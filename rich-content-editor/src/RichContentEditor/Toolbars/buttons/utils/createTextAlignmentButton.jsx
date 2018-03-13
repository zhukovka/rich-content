import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextButton from '../TextButton';

export default ({ alignment, Icon, tooltipText }) =>
  class TextAlignmentButton extends Component {
    static propTypes = {
      alignment: PropTypes.string,
      onClick: PropTypes.func,
      theme: PropTypes.object.isRequired,
      isMobile: PropTypes.bool
    };

    isActive = () => this.props.alignment === alignment;

    handleClick = () => this.props.onClick && this.props.onClick(alignment);

    render() {
      const { theme, isMobile } = this.props;
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

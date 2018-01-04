import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default ({ alignment, content }) => (
  class TextAlignmentButton extends Component {
    static propTypes = {
      alignment: PropTypes.string,
      theme: PropTypes.object,
    };

    isActive = () => this.props.alignment === alignment;

    handleClick = event => this.props.onClick && this.props.onClick(alignment);

    preventBubblingUp = event => event.preventDefault();

    render() {
      const { theme } = this.props;
      const className = this.isActive() ? classNames(theme.button, theme.active) : theme.button;
      return (
        <div
          className={theme.buttonWrapper}
          onMouseDown={this.preventBubblingUp}
        >
          <button
            className={className}
            onClick={this.handleClick}
            type="button"
            children={content}
          />
        </div>
      );
    }
  }
);

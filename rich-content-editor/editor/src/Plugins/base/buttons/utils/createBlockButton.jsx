import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default ({ content, onClick }) => (
  class BlockButton extends Component {
    static propTypes = {
      onClick: PropTypes.func.isRequired,
      theme: PropTypes.object,
    };

    handleClick = () => this.props.onClick && this.props.onClick();

    preventBubblingUp = event => { event.preventDefault(); }

    render() {
      const { theme } = this.props;
      return (
        <div
          className={theme.buttonWrapper}
          onMouseDown={this.preventBubblingUp}
        >
          <button
            className={theme.button}
            onClick={this.handleClick}
            type="button"
            children={content}
          />
        </div>
      );
    }
  }
);

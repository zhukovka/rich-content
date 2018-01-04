import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RichUtils } from 'draft-js';
import classNames from 'classnames';

export default ({ style, content }) => (
  class TextInlineStyleButton extends Component {

    toggleStyle = event => {
      event.preventDefault();
      this.props.setEditorState(
        RichUtils.toggleInlineStyle(
          this.props.getEditorState(),
          style
        )
      );
    }

    preventBubblingUp = event => event.preventDefault();

    styleIsActive = () => this.props.getEditorState && this.props.getEditorState().getCurrentInlineStyle().has(style);

    render() {
      const { theme } = this.props;
      const className = this.styleIsActive() ? classNames(theme.button, theme.active) : theme.button;
      return (
        <div
          className={theme.buttonWrapper}
          onMouseDown={this.preventBubblingUp}
        >
          <button
            className={className}
            onClick={this.toggleStyle}
            type="button"
            children={content}
          />
        </div>
      );
    }
  }
);

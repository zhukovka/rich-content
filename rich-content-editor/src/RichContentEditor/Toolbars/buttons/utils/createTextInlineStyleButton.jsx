import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RichUtils } from 'draft-js';
import classNames from 'classnames';

export default ({ style, content }) =>
  class TextInlineStyleButton extends Component {
    static propTypes = {
      getEditorState: PropTypes.func.isRequired,
      setEditorState: PropTypes.func.isRequired,
      theme: PropTypes.object,
    };

    toggleStyle = event => {
      const { getEditorState, setEditorState } = this.props;
      event.preventDefault();
      setEditorState(RichUtils.toggleInlineStyle(getEditorState(), style));
    };

    preventBubblingUp = event => event.preventDefault();

    styleIsActive = () =>
      this.props.getEditorState &&
      this.props
        .getEditorState()
        .getCurrentInlineStyle()
        .has(style);

    render() {
      const { theme } = this.props;
      const className = this.styleIsActive() ? classNames(theme.button, theme.active) : theme.button;
      return (
        <div className={theme.buttonWrapper} onMouseDown={this.preventBubblingUp}>
          <button className={className} onClick={this.toggleStyle} type="button" children={content} />
        </div>
      );
    }
  };

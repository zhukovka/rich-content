import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RichUtils } from '@wix/draft-js';
import TextButton from '../TextButton';

export default ({ style, Icon, tooltipText }) =>
  class TextInlineStyleButton extends Component {
    static propTypes = {
      getEditorState: PropTypes.func.isRequired,
      setEditorState: PropTypes.func.isRequired,
      theme: PropTypes.object.isRequired,
    };

    toggleStyle = event => {
      const { getEditorState, setEditorState } = this.props;
      event.preventDefault();
      setEditorState(RichUtils.toggleInlineStyle(getEditorState(), style));
    };

    isActive = () => {
      const { getEditorState } = this.props;
      if (getEditorState) {
        return getEditorState()
          .getCurrentInlineStyle()
          .has(style);
      } else {
        return false;
      }
    }

    render() {
      const { theme } = this.props;
      return (
        <TextButton
          icon={Icon}
          theme={theme}
          isActive={this.isActive}
          onClick={this.toggleStyle}
          tooltipText={tooltipText}
        />
      );
    }
  };

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RichUtils } from '@wix/draft-js';
import { translate } from 'react-i18next';
import TextButton from '../TextButton';

export default ({ style, Icon, tooltipTextKey }) => {
  class TextInlineStyleButton extends Component {
    static propTypes = {
      getEditorState: PropTypes.func.isRequired,
      setEditorState: PropTypes.func.isRequired,
      theme: PropTypes.object.isRequired,
      isMobile: PropTypes.bool,
      t: PropTypes.func
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
      const { theme, isMobile, t } = this.props;
      const tooltipText = t(tooltipTextKey);
      return (
        <TextButton
          icon={Icon}
          theme={theme}
          isMobile={isMobile}
          isActive={this.isActive}
          onClick={this.toggleStyle}
          tooltipText={tooltipText}
        />
      );
    }
  }

  return translate(null)(TextInlineStyleButton);
};

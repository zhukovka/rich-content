import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RichUtils } from 'draft-js';

import TextButton from './TextButton';

export default ({ value, keyName, tooltipTextKey }) =>
  class TitleButton extends Component {
    static propTypes = {
      getEditorState: PropTypes.func.isRequired,
      setEditorState: PropTypes.func.isRequired,
      onClick: PropTypes.func,
      theme: PropTypes.object.isRequired,
      isMobile: PropTypes.bool,
      t: PropTypes.func,
      tabIndex: PropTypes.number,
      shouldRefreshTooltips: PropTypes.func,
      keyName: PropTypes.string,
    };

    handleClick = () => {
      const { getEditorState, setEditorState, onClick } = this.props;
      setEditorState(RichUtils.toggleBlockType(getEditorState(), value));
      onClick?.(value);
    };

    isActive = () => this.props.keyName === keyName;

    render() {
      const { theme, isMobile, t, tabIndex, shouldRefreshTooltips } = this.props;
      const tooltipText = t(tooltipTextKey);
      const textForHooks = tooltipText.replace(/\s+/, '');
      const dataHookText = `textTitleButton_${textForHooks}`;

      return (
        <TextButton
          textButtonKeyName={keyName}
          theme={theme}
          isMobile={isMobile}
          isActive={this.isActive}
          onClick={this.handleClick}
          tooltipText={tooltipText}
          dataHook={dataHookText}
          tabIndex={tabIndex}
          shouldRefreshTooltips={shouldRefreshTooltips}
        />
      );
    }
  };

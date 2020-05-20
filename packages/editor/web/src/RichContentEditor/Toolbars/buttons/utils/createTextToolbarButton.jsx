import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextButton from '../TextButton';
import generateTextToolbarButtonProps from './generateTextToolbarButtonProps';
/*
  createTextToolbarButton
*/
export default ({ type, styles, icons, tooltipTextKey }) =>
  class TextToolbarButton extends Component {
    static propTypes = {
      getEditorState: PropTypes.func.isRequired,
      setEditorState: PropTypes.func.isRequired,
      theme: PropTypes.object.isRequired,
      isVisible: PropTypes.bool,
      isMobile: PropTypes.bool,
      t: PropTypes.func,
      tabIndex: PropTypes.number,
      alignment: PropTypes.string,
      onClick: PropTypes.func,
      shouldRefreshTooltips: PropTypes.bool,
    };

    getButtonProps = () => {
      const { onClick, alignment, getEditorState, setEditorState, t } = this.props;
      return generateTextToolbarButtonProps({
        externalOnClick: onClick,
        alignment,
        getEditorState,
        setEditorState,
        t,
        type,
        styles,
        icons,
        tooltipTextKey,
      });
    };

    render() {
      const { getIcon, onClick, isActive, isDisabled, tooltip, dataHook } = this.getButtonProps();
      const { theme, isMobile, tabIndex } = this.props;
      return (
        <TextButton
          icon={getIcon()}
          theme={theme}
          isMobile={isMobile}
          isActive={isActive}
          onClick={onClick}
          tooltipText={tooltip}
          dataHook={dataHook}
          disabled={isDisabled()}
          tabIndex={tabIndex}
          shouldRefreshTooltips={this.props.shouldRefreshTooltips}
        />
      );
    }
  };

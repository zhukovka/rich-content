import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextLabelButton from '../TextLabelButton';

const createInlineStyleButton = ({ style, labelKey, Icon, tooltipTextKey, className }) =>
  class InlineStyleButton extends Component {
    static propTypes = {
      getEditorState: PropTypes.func.isRequired,
      setEditorState: PropTypes.func.isRequired,
      theme: PropTypes.object.isRequired,
      isMobile: PropTypes.bool,
      t: PropTypes.func,
      tabIndex: PropTypes.number,
      onClick: PropTypes.func.isRequired,
    };

    handleClick = event => {
      const { onClick } = this.props;
      event.preventDefault();
      onClick && onClick(style);
    };

    render() {
      const { theme, isMobile, t, tabIndex } = this.props;
      const tooltipText = t(tooltipTextKey);
      const label = t(labelKey);
      const textForHooks = tooltipText.replace(/\s+/, ''); // TODO: fix data-hooks
      const dataHookText = `textInlineStyleButton_${textForHooks}`;

      return (
        <TextLabelButton
          icon={Icon}
          theme={theme}
          isMobile={isMobile}
          onClick={this.handleClick}
          tooltipText={tooltipText}
          dataHook={dataHookText}
          tabIndex={tabIndex}
          className={className}
          label={label}
        />
      );
    }
  };

export default createInlineStyleButton;

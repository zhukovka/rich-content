import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextButton from '../TextButton';

export default ({ onStyleChange, getSelectionStyle, styles, Icons, InactiveIcon = null, tooltipTextKey }) =>
  class InlineStyleSwitchButton extends Component {
    static propTypes = {
      getEditorState: PropTypes.func.isRequired,
      setEditorState: PropTypes.func.isRequired,
      theme: PropTypes.object.isRequired,
      isVisible: PropTypes.bool,
      isMobile: PropTypes.bool,
      t: PropTypes.func,
      tabIndex: PropTypes.number,
    };

    constructor(props) {
      super(props);
      this.state = {
        styleIndex: undefined,
      };
    }

    get selectionStyle() {
      const { getEditorState } = this.props;
      const editorState = getEditorState();
      return getSelectionStyle({ editorState, styles });
    }

    get Icon() {
      const { styleIndex } = this.state;
      if (styleIndex !== undefined) {
        return Icons[styleIndex];
      } else {
        return InactiveIcon ? InactiveIcon : Icons[0];
      }
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.isVisible === false && nextProps.isVisible === true) {
        const { selectionStyle } = this;
        const styleFoundIndex = styles.findIndex(b => b === selectionStyle);
        const styleIndex = styleFoundIndex > -1 ? styleFoundIndex : undefined;
        this.setState({ styleIndex });
      }
    }

    getNextStyleIndex() {
      const style = this.selectionStyle;
      if (style) {
        const styleIndex = styles.findIndex(s => s === style);
        return (styleIndex + 1) % styles.length;
      }
    }

    setStyle = () => {
      const { getEditorState, setEditorState } = this.props;
      const newStyleIndex = this.getNextStyleIndex();
      if (newStyleIndex === undefined) {
        return;
      }
      const nextStyle = styles[newStyleIndex];
      onStyleChange({ getEditorState, setEditorState, styles, nextStyle });
      this.setState({ styleIndex: newStyleIndex });
    };

    styleIsActive = () => {
      const { style } = this;
      return typeof style !== 'undefined' && style === this.selectionStyle;
    };

    render() {
      const { Icon } = this;
      const { theme, isMobile, t, tabIndex } = this.props;
      const tooltipText = t(tooltipTextKey);
      const textForHooks = tooltipText.replace(/\s+/, ''); // TODO: data-hooks
      const dataHookText = `textBlockStyleButton_${textForHooks}`;

      return (
        <TextButton
          icon={Icon}
          theme={theme}
          isMobile={isMobile}
          isActive={this.styleIsActive}
          onClick={this.setStyle}
          tooltipText={tooltipText}
          dataHook={dataHookText}
          tabIndex={tabIndex}
        />
      );
    }
  };

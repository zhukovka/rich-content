import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TextLabelButton from '../TextLabelButton';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../../../../statics/styles/inline-style-dropdown-button.scss';

const createInlineStyleDropdownButton = ({ buttons, activeItem, onChange, tooltipTextKey, Icon }) =>

  class InlineStyleDropdownButton extends PureComponent {
    static propTypes = {
      getEditorState: PropTypes.func.isRequired,
      setEditorState: PropTypes.func.isRequired,
      theme: PropTypes.object.isRequired,
      defaultValue: PropTypes.string,
      isVisible: PropTypes.bool,
      isMobile: PropTypes.bool,
      t: PropTypes.func,
      tabIndex: PropTypes.number,
    };

    constructor(props) {
      super(props);
      const { defaultValue, getEditorState } = this.props;
      this.state = {
        isOpen: false,
        selected: activeItem({ getEditorState, defaultValue }),
      };

      const theme = props.theme || {};
      this.styles = mergeStyles({ styles, theme: this.theme });

      this.theme = {
        ...theme,
        buttonStyles: {
          textLabelButton_wrapper: this.styles.inlineStyleDropdownButton_wrapper, //eslint-disable-line camelcase
          textLabelButton: this.styles.inlineStyleDropdownButton,
          textLabelButton_icon: this.styles.inlineStyleDropdownButton_icon, //eslint-disable-line camelcase
        },
      };
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.isVisible === true && nextProps.isVisible === false) {
        this.setState({ isOpen: false });
      }
    }

    showOptions = () => this.setState({ isOpen: true });

    renderOptions = () => {
      const { getEditorState, setEditorState } = this.props;
      const { selected } = this.state;
      const onClick = value => {
        onChange(getEditorState, setEditorState, value);
        this.setState({ selected: activeItem({ value }), isOpen: false });
      };

      const buttonProps = {
        style: selected.style,
        onClick,
        ...this.props,
        theme: this.theme,
      };
      return (
        <div className={this.styles.inlineStyleDropdown_options}>
          {buttons.map((Button, i) => <Button key={i} tabIndex={0} {...buttonProps} />)}
        </div>
      );
    };

    render() {
      const { selected: { labelKey }, isOpen } = this.state;
      const { isMobile, tabIndex, t } = this.props;
      const tooltipText = t(tooltipTextKey);
      const textForHooks = tooltipText.replace(/\s+/, '');
      const dataHookText = `textDropDownButton_${textForHooks}`; // TODO: fix data-hooks

      return (
        <div className={this.styles.inlineStyleDropdown_wrapper}>
          <TextLabelButton
            icon={Icon}
            label={labelKey ? t(labelKey) : ''}
            theme={this.theme}
            isMobile={isMobile}
            dataHook={dataHookText}
            onClick={this.showOptions}
            tooltipText={tooltipText}
            tabIndex={tabIndex}
          />
          {isOpen && this.renderOptions()}
        </div>
      );
    }
  };

export default createInlineStyleDropdownButton;

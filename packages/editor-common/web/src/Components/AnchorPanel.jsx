/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';
import Tooltip from './Tooltip';
import { ErrorIcon } from '../Icons';
import styles from '../../statics/styles/anchor-panel.scss';
import InfoIcon from '../Icons/InfoIcon.svg';

class AnchorPanel extends Component {
  state = { showValidation: false };
  styles = mergeStyles({ styles, theme: this.props.theme });

  componentDidMount() {
    this.onChange({ isValid: this.isValidAnchor(this.props.linkValues.name) });
  }

  isValidAnchor = name => {
    const isValidAnchor =
      (this.props.existingName === name ||
        !name ||
        !(this.props.anchorsEntities.filter(entity => entity.data.name === name).length > 0)) &&
      name !== '';
    return isValidAnchor;
  };

  handleUrlChange = name => {
    this.setState({ showValidation: false });
    this.onChange({
      name,
      isValid: this.isValidAnchor(name),
    });
  };

  onChange = changes => {
    this.props.onChange({ ...this.props.linkValues, ...changes });
  };

  handleKeyDown = e => {
    const { onEnter, onEscape } = this.props;
    if (e.key === 'Enter') {
      this.setState({ showValidation: true });
      e.preventDefault();
      onEnter && onEnter(e);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onEscape && onEscape(e);
    }
  };

  hasError() {
    return this.props.linkValues.isValid === false && this.state.showValidation;
  }

  getTextInput() {
    return (
      <input
        value={this.props.linkValues.name}
        onChange={e => this.handleUrlChange(e.target.value)}
        {...this.getTextInputProps()}
      />
    );
  }

  getTextInputProps() {
    const { styles } = this;
    const textInputClassName = classNames(styles.linkPanel_textInput, {
      [styles.linkPanel_textInput_invalid]: this.hasError(),
    });
    return {
      type: 'text',
      className: textInputClassName,
      placeholder: this.props.t('AnchorPlugin_Modal_Placeholder_Empty'),
      'data-hook': 'anchorPanelInput',
      onBlur: () => this.setState({ showValidation: true }),
    };
  }

  render() {
    const { styles } = this;
    const { theme, ariaProps, t, linkValues } = this.props;

    const { name, isValid } = linkValues;

    return (
      <div className={styles.anchorPanel_Content} {...ariaProps} role="form">
        <div className={styles.anchorPanel_DescriptionLabel}>
          <span>{t('AnchorPlugin_Modal_Placeholder_Empty')}</span>
          <Tooltip
            shouldRebuildOnUpdate={() => true}
            content={t('AnchorPlugin_Modal_Description')}
            theme={styles.theme}
            moveBy={{ x: -4 }}
          >
            <InfoIcon className={styles.anchor_infoIcon} />
          </Tooltip>
        </div>
        <div className={styles.anchorPanel_Input} onKeyDown={this.handleKeyDown}>
          {this.getTextInput()}
          {this.hasError() && (
            <Tooltip
              shouldRebuildOnUpdate={() => !isValid}
              data-hook="anchorPanelTooltip"
              content={
                name === ''
                  ? t('AnchorPlugin_EmptyNameErrorTooltip')
                  : t('AnchorPlugin_ExistingNameErrorTooltip')
              }
              theme={theme}
              moveBy={{ y: 0 }}
              type={'error'}
            >
              <ErrorIcon data-hook="anchorPanelError" className={styles.anchorPanel_errorIcon} />
            </Tooltip>
          )}
        </div>
      </div>
    );
  }
}

AnchorPanel.propTypes = {
  t: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  linkValues: PropTypes.shape({
    name: PropTypes.string,
    isValid: PropTypes.bool,
  }).isRequired,
  ariaProps: PropTypes.object,
  onEnter: PropTypes.func,
  onEscape: PropTypes.func,
  anchorsEntities: PropTypes.array.isRequired,
  existingName: PropTypes.string,
};
export default AnchorPanel;

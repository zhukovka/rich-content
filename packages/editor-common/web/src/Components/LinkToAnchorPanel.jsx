/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';
import Tooltip from './Tooltip';
import { ErrorIcon } from '../Icons';
import styles from '../../statics/styles/link-panel.scss';
import { LinkPanelDropdown } from './LinkPanelDropdown';

class LinkToAnchorPanel extends Component {
  state = { showValidation: false };
  styles = mergeStyles({ styles, theme: this.props.theme });

  componentDidMount() {
    this.withAnchors = this.props.anchorsEntities ? this.props.anchorsEntities.length !== 0 : false;
    this.onChange({ isValid: this.isValidUrl(this.props.linkValues.url) });
  }

  handleUrlChange = url => {
    this.setState({ showValidation: false });
    this.onChange({
      url,
      isValid: this.isValidUrl(url),
      targetBlank: false,
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

  isValidUrl = url => {
    return !url || this.props.anchorsEntities.some(anchor => anchor.data.name === url);
  };

  hasError() {
    return this.props.linkValues.isValid === false && this.state.showValidation;
  }

  getAnchorInputProps() {
    const { styles } = this;
    const textInputClassName = classNames(styles.linkPanel_textInput, {
      [styles.linkPanel_textInput_invalid]: this.hasError(),
    });
    return {
      type: 'string',
      className: textInputClassName,
      placeholder: this.props.placeholder || this.props.t('LinkPanel_AnchorInputPlaceholder'),
      'data-hook': 'anchorLinkPanelInput',
      onBlur: () => this.setState({ showValidation: true }),
    };
  }

  getAnchorsNames = () => {
    return this.props.anchorsEntities.map(anchorEntity => {
      return { value: anchorEntity.data.name, label: anchorEntity.data.name };
    });
  };

  render() {
    const { styles } = this;
    const { theme, ariaProps, t, linkValues } = this.props;

    const { isValid } = linkValues;
    return (
      <div className={styles.linkPanel_Content} {...ariaProps} role="form">
        <div className={styles.linkPanel_Input} onKeyDown={this.handleKeyDown}>
          <LinkPanelDropdown
            key={'anchor'}
            theme={this.props.theme}
            initialValue={this.props.linkValues.url}
            onChange={this.handleUrlChange}
            textInputProps={this.getAnchorInputProps()}
            {...this.props.dropDown}
            getItems={this.getAnchorsNames}
            withoutSearch
          />
          {this.hasError() && (
            <Tooltip
              shouldRebuildOnUpdate={() => !isValid}
              data-hook="linkPanelTooltip"
              content={t('LinkPanel_AnchorErrorTooltip')}
              theme={theme}
              moveBy={{ y: 0 }}
              type={'error'}
            >
              <ErrorIcon data-hook="linkPanelError" className={styles.linkPanel_errorIcon} />
            </Tooltip>
          )}
        </div>
      </div>
    );
  }
}

LinkToAnchorPanel.propTypes = {
  anchorsEntities: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  linkValues: PropTypes.shape({
    url: PropTypes.string,
    isValid: PropTypes.bool,
    targetBlank: PropTypes.bool,
    nofollow: PropTypes.bool,
  }).isRequired,
  ariaProps: PropTypes.object,
  dropDown: PropTypes.object,
  onEnter: PropTypes.func,
  onEscape: PropTypes.func,
  placeholder: PropTypes.string,
};
export default LinkToAnchorPanel;

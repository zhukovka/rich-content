import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isUndefined from 'lodash/isUndefined';
import { isValidUrl } from '~/Utils/urlValidators';

import Tooltip from '~/Components/Tooltip';
import ErrorIcon from './icons/error.svg';
import { mergeStyles } from '~/Utils';
import styles from '~/Styles/link-panel.scss';

class LinkPanel extends Component {
  constructor(props) {
    super(props);
    const { url, targetBlank, nofollow } = props;
    const intermediateUrl = url || '';
    this.state = {
      intermediateUrl,
      url: url || '',
      isValidUrl: true,
      targetBlank: isUndefined(targetBlank) ? true : targetBlank,
      nofollow: isUndefined(nofollow) ? false : nofollow,
    };
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  handleIntermediateUrlChange = event => {
    this.setState({ intermediateUrl: event.target.value });
  };

  handleUrlChange = () => {
    const { intermediateUrl } = this.state;
    this.setState({ url: intermediateUrl });
  };

  handleTargetChange = event => {
    this.setState({ targetBlank: event.target.checked });
  };

  handleNofollowChange = event => {
    this.setState({ nofollow: event.target.checked });
  };

  validateUrl = () => {
    const { intermediateUrl } = this.state;
    const isValidUrlConst = isValidUrl(intermediateUrl);
    if (isValidUrlConst) {
      this.handleUrlChange();
    }
    this.setState({ isValidUrl: isValidUrlConst });
  };

  handleKeyPress = e => {
    if (e.charCode === 13) {
      this.validateUrl(e);
    }
  };

  render() {
    const { styles } = this;
    const { isImageSettings } = this.props;
    const firstCheckboxText = 'Open Link in New Window / Tab';
    const secondCheckboxText = 'Add rel="nofollow" to link';
    const inputPlaceholder = isImageSettings ? 'Add a link' : 'e.g. www.wix.com';
    const textInputClassName = classNames(styles.linkPanel_textInput,
      {
        [styles.linkPanel_textInput_invalid]: !this.state.isValidUrl,
        [styles.linkPanel_imageSettings]: isImageSettings
      }
    );
    return (
      <div className={styles.linkPanel_Content}>
        <div onKeyPress={this.handleKeyPress}>
          <div className={styles.linkPanel_Input}>
            <input
              ref={ref => (this.input = ref)}
              className={textInputClassName}
              placeholder={inputPlaceholder}
              onChange={this.handleIntermediateUrlChange}
              onBlur={this.validateUrl}
              value={this.state.intermediateUrl}
            />
            {this.state.isValidUrl ? null : (
              <Tooltip
                content={'Invalid URL. Try Again'}
                moveBy={{ x: -23, y: -5 }}
                theme={this.props.theme}
              >
                <span><ErrorIcon className={styles.linkPanel_errorIcon} /></span>
              </Tooltip>
            )}
          </div>
        </div>
        <checkboxWrapper>
          <div className={styles.linkPanel_checkboxContainer}>
            <input
              className={styles.linkPanel_checkboxContainerInput} type="checkbox" id="firstCheckboxLinkPanel"
              onChange={this.handleTargetChange} defaultChecked={this.state.targetBlank}
            />
            <label className={styles.linkPanel_checkboxContainerLabel} htmlFor="firstCheckboxLinkPanel">{firstCheckboxText}</label>
          </div>
          <div className={styles.linkPanel_checkboxContainer}>
            <input
              className={styles.linkPanel_checkboxContainerInput} type="checkbox"
              id="secondCheckboxLinkPanel" onChange={this.handleNofollowChange} defaultChecked={this.state.nofollow}
            />
            <label className={styles.linkPanel_checkboxContainerLabel} htmlFor="secondCheckboxLinkPanel">{secondCheckboxText}</label>
          </div>
        </checkboxWrapper>
      </div>
    );
  }
}

LinkPanel.propTypes = {
  url: PropTypes.string,
  targetBlank: PropTypes.bool,
  nofollow: PropTypes.bool,
  isImageSettings: PropTypes.bool,
  theme: PropTypes.object.isRequired,
};
export default LinkPanel;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Tooltip from 'wix-style-react/dist/src/Tooltip';

import { ThemeProvider } from '../Common/theme-provider';
import { isValidUrl } from './url-validator';
import ErrorIcon from './icons/error.svg';
import style from './link-panel.scss';
import RadioGroupHorizontal from './stylable-base/radio-group-horizontal';

const LinkType = props => (
  <RadioGroupHorizontal
    dataSource={[{ value: 'url', labelText: 'Website address (URL)' }, { value: 'page', labelText: 'Site Page' }]}
    {...props}
  />
);

LinkType.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

class LinkPanel extends Component {
  constructor(props) {
    super(props);
    const { url, targetBlank, nofollow } = props;
    this.state = {
      url: url || '',
      isValidUrl: true,
      targetBlank: targetBlank || true,
      nofollow: nofollow || false,
    };
  }

  handleURLChange = event => {
    this.setState({ url: event.target.value });
  };

  handleTargetChange = event => {
    this.setState({ targetBlank: event.target.checked });
  };

  handleNofollowChange = event => {
    this.setState({ nofollow: event.target.checked });
  };

  onBlur = e => {
    e.stopPropagation();
    const { url } = this.state;
    if (isValidUrl(url)) {
      //TODO: should I do anything?
      // this.onDoneClick();
    } else {
      this.setState({ isValidUrl: false });
    }
  };

  handleKeyPress = e => {
    if (e.charCode === 13) {
      this.onBlur();
    }
  };

  onDoneClick = () => {
    const { url, targetBlank, nofollow } = this.state;
    this.props.onDone && this.props.onDone({ url, targetBlank, nofollow });
  };

  onCancelClick = () => this.props.onCancel && this.props.onCancel();

  render() {
    const firstCheckboxText = 'Open Link in New Window / Tab';
    const secondCheckboxText = 'Add rel="nofollow" to link';
    return (
      <ThemeProvider theme={'default'}>
        <div className={style.modal}>
          <LinkType
            value="url"
          />
          <div onKeyPress={this.handleKeyPress}>
            <div className={style['text-input']}>
              <input
                ref={ref => (this.input = ref)}
                className={classNames({ [style.invalid]: !this.state.isValidUrl })}
                placeholder="e.g. www.wix.com"
                onChange={this.handleURLChange}
                onBlur={this.onBlur}
                value={this.state.url}
              />
              {this.state.isValidUrl ? null : (
                <Tooltip
                  content={'Invalid URL. Try Again'}
                  textAlign="center"
                  maxWidth=""
                  shouldCloseOnClickOutside
                  theme="dark"
                >
                  <ErrorIcon className={style.errorIcon} />
                </Tooltip>
              )}
            </div>
          </div>
          <div className={style['checkbox-container']}>
            <input type="checkbox" onChange={this.handleTargetChange} defaultChecked={this.state.targetBlank}/>
            <label>{firstCheckboxText}</label>
          </div>
          <div className={style['checkbox-container']}>
            <input type="checkbox" onChange={this.handleNofollowChange} defaultChecked={this.state.nofollow}/>
            <label>{secondCheckboxText}</label>
          </div>
          {/*<button onClick={this.onDoneClick}>Done</button>
        <button onClick={this.onCancelClick}>Cancel</button>*/}
        </div>
      </ThemeProvider>
    );
  }
}

LinkPanel.propTypes = {
  onDone: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  url: PropTypes.string,
  targetBlank: PropTypes.bool,
  nofollow: PropTypes.bool,
};

export default LinkPanel;

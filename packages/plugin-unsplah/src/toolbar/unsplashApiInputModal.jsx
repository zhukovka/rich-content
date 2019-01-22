import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { mergeStyles, TextInput, WixUtils } from 'wix-rich-content-common';
import { SearchIcon } from '../icons';
import styles from '../../statics/styles/unsplash-api-input-modal.scss';
import UnsplashSelector from './unsplashSelector';

export default class UnsplashApiInputModal extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = {
      searchTag: ''
    };
    console.log(this.props);
  }

  onChange = e => {
    this.setState({ searchTag: e.target.value });
  };

  onCloseRequested = () => {
    this.setState({ isOpen: false });
    this.props.helpers.closeModal();
  };

  handleKeyPress = e => {
    if (e.charCode === 27) {
      this.onCloseRequested();
    }
  };
  handleClearText = () => {
    this.setState({ searchTag: '' });
  };

  render() {
    const { styles } = this;
    const { t, theme } = this.props;
    const searchTag = this.state.searchTag;
    const backButton =
      (<div
        className={styles.unsplash_api_input_modal_backButton}
        onClick={this.onCloseRequested}
        role="button"
        tabIndex="0"
        onKeyPress={null}
      />);
    const mobileNavbar =
      (
        <div>
          <div className={styles.unsplash_api_input_modal_navbar}>{t('UnsplashUploadModal_mobileNavbar_Title')} {backButton}</div>
        </div>
      );
    return (
      <div>
        {(WixUtils.isMobile()) ? <div>{mobileNavbar}</div> : null}
        <div className={styles.unsplash_api_input_modal_container} data-hook="unsplashUploadModal">
          <div className={styles.unsplash_api_input_modal_search_textinput_group} >
            <SearchIcon className={styles.unsplash_api_input_modal_searchIcon} />
            <TextInput
              inputRef={ref => {
                this.input = ref;
              }}
              className={styles.unsplash_api_input_modal_search_input}
              onKeyPress={this.handleKeyPress}
              onChange={this.onChange}
              value={this.state.searchTag}
              placeholder={t('UnsplashUploadModal_Input_Placeholder')}
              theme={styles}
              data-hook="UnsplashUploadModalInput"
            />
            {/* <div className={styles.unsplash_api_input_modal_searchIcon} >
              {(this.state.searchTag) &&
                <div onClick={this.handleClearText} role="button" tabIndex="0" onKeyPress={null}>
                  <CloseIcon className={styles.closeIcon} />
                </div>}
            </div> */}
          </div>
          <UnsplashSelector
            searchTag={searchTag}
            onCloseRequested={this.onCloseRequested}
            {...this.props}
          />
        </div>
      </div>
    );
  }
}

UnsplashApiInputModal.propTypes = {
  onChange: PropTypes.func,
  helpers: PropTypes.object.isRequired,
  searchTag: PropTypes.string,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func
};

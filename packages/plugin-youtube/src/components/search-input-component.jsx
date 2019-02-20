import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles, TextInput, Button, isVideoUrl, WixUtils } from 'wix-rich-content-common';
import styles from '../../statics/styles/search-input.scss';
class SearchInputComponent extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: this.props.theme });
    const { t } = this.props;
    this.state = {
      textInputValue: '',
      searchTerm: '',
      selectedVideoUrl: this.props.selectedVideoUrl,
      buttonText: t('YoutubePlugin_SearchButton_Text'),
    };
  }

  onFocus = () => {
    this.props.onSearchTextBoxFocused(true);
  };

  onBlur = () => {
    this.props.onSearchTextBoxBlured(false);
  };

  onTextInputChanged = e => {
    const { t } = this.props;
    this.setState({ textInputValue: e.target.value });
    if (isVideoUrl(e.target.value)) {
      this.setState({ buttonText: t('YoutubePlugin_AddButton_Text') });
    } else {
      this.setState({ buttonText: t('YoutubePlugin_SearchButton_Text') });
    }
  };

  onSearchClicked = () => {
    const { textInputValue } = this.state;
    this.setState({ searchTerm: textInputValue });
    this.props.onSearchButtonClicked(textInputValue);
  };

  handleOnKeyPressed = e => {
    if (e.key === 'Enter') {
      this.props.onKeyPress(this.state.textInputValue);
    }
  };

  render() {
    const { t } = this.props;
    return (
      <div className={styles.search_input_container}>
        <TextInput
          onChange={this.onTextInputChanged.bind(this)}
          onKeyPress={this.handleOnKeyPressed}
          placeholder={t('YoutubePlugin_Search_Textbox_Placeholder')}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          theme={this.styles}
        />
        {!WixUtils.isMobile() && (
          <Button onClick={this.onSearchClicked} theme={this.styles} type="secondary">
            {this.state.buttonText}
          </Button>
        )}
      </div>
    );
  }
}

SearchInputComponent.propTypes = {
  theme: PropTypes.object.isRequired,
  selectedVideoUrl: PropTypes.string,
  componentData: PropTypes.object.isRequired,
  helpers: PropTypes.object,
  pubsub: PropTypes.object,
  onConfirm: PropTypes.func,
  onSearchButtonClicked: PropTypes.func,
  onKeyPress: PropTypes.func,
  t: PropTypes.func.isRequired,
  onSearchTextBoxFocused: PropTypes.func,
  onSearchTextBoxBlured: PropTypes.func,
};

export default SearchInputComponent;

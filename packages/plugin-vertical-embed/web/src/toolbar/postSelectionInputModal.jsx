import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { CloseIcon, Button, TextInput } from 'wix-rich-content-editor-common';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/post-selection-input-modal.scss';
import ItemsListComponent from '../components/items-list-component';

export default class PostSelectionInputModal extends Component {
  state = {
    errorMsg: '',
    posts: [],
    selectedPost: null,
  };
  styles = mergeStyles({ styles, theme: this.props.theme });

  afterOpenModal = () => this.input.focus();

  onCloseRequested = () => {
    this.setState({ isOpen: false });
    this.props.helpers.closeModal();
  };

  handleKeyPress = e => {
    if (e.charCode === 13) {
      this.onConfirm();
    }
  };

  componentDidMount() {
    this.input.focus();
    this.input.setSelectionRange(0, this.input.value.length);
    this.search();
  }

  handleKeyPress = () => { };

  currentAbortController = null;
  async search(query) {
    const { abortController, promise } = this.props.searchPosts(query);
    if (this.currentAbortController) {
      this.currentAbortController.abort();
    }
    this.currentAbortController = abortController;

    try {
      const posts = await promise;
      this.setState({ posts });
    } catch (e) {
      if (e.name === 'AbortError') {
        return;
      }
      throw e;
    }
  }

  onInputChange = e => this.search(e.target.value);

  onConfirm = () => {
    const { onConfirm, componentData } = this.props;
    if (onConfirm) {
      onConfirm({ ...componentData, selectedPost: this.state.selectedPost || this.state.posts[0] });
      this.onCloseRequested();
    }
  };

  handleKeyPress = e => {
    if (e.charCode === 13) {
      this.onConfirm();
    }
  };

  render() {
    const { posts } = this.state;
    const { t, isMobile, languageDir } = this.props;
    const { styles } = this;

    return (
      <div dir={languageDir}>
        <div className={styles.verticalEmbedContainer} data-hook="verticalEmbedModal">
          {!isMobile && (
            <CloseIcon
              className={styles.verticalEmbedModalCloseIcon}
              onClick={() => this.onCloseRequested()}
            />
          )}
          <h2 className={styles.verticalEmbedModalTitle}>{t('Select_Blog_Post_Title')}</h2>
          <div className={styles.textInputWrapper}>
            <TextInput
              inputRef={ref => {
                this.input = ref;
              }}
              onKeyPress={this.handleKeyPress}
              onChange={this.onInputChange}
              placeholder={t('VideoUploadModal_Input_Placeholder')}
              theme={styles}
              data-hook="videoUploadModalInput"
            />
          </div>
          {posts && posts.length > 0 && <ItemsListComponent items={posts} onSelectionChange={selectedPost => this.setState({ selectedPost })} />}
        </div>

        <div className={styles.actionButtonsContainer}>
          <Button
            type="secondary"
            className={styles.actionButton}
            onClick={() => this.onCloseRequested()}
          >
            Cancel
          </Button>
          <Button className={styles.actionButton} onClick={() => this.onConfirm()}>
            Choose
          </Button>
        </div>
      </div>
    );
  }
}

PostSelectionInputModal.propTypes = {
  onConfirm: PropTypes.func,
  helpers: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
  url: PropTypes.string,
  theme: PropTypes.object.isRequired,
  doneLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  t: PropTypes.func,
  isMobile: PropTypes.bool,
  languageDir: PropTypes.string,
  fetchPosts: PropTypes.func,
  searchPosts: PropTypes.func,
};

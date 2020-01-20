import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { CloseIcon } from 'wix-rich-content-editor-common';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/post-selection-input-modal.scss';

export default class PostSelectionInputModal extends Component {
  state = {
    errorMsg: '',
    posts: [],
  };
  styles = mergeStyles({ styles, theme: this.props.theme });
  id = `VideoUploadModal_FileInput_${Math.floor(Math.random() * 9999)}`;

  afterOpenModal = () => {};

  onCloseRequested = () => {
    this.setState({ isOpen: false });
    this.props.helpers.closeModal();
  };

  handleKeyPress = e => {
    if (e.charCode === 13) {
      this.onConfirm();
    }
  };

  fetchPosts = () =>
    fetch(`${this.props.blogAPIUrl}/posts?limit=20`, {
      headers: {
        Accept: 'application/json',
        Authorization: this.props.instance,
      },
    })
      .then(resp => (resp.ok ? resp.json() : {}))
      .then(json => this.setState({ posts: json.post || [] }))
      .catch(error => console.log('Error in fetching posts: ', error));

  componentDidMount() {
    this.fetchPosts();
  }

  render() {
    const { posts } = this.state;
    const { t, isMobile, languageDir } = this.props;
    const { styles } = this;

    return (
      <div dir={languageDir}>
        <div className={styles.video_modal_container_big} data-hook="videoUploadModal">
          {!isMobile && (
            <CloseIcon
              className={styles.video_modal_closeIcon}
              onClick={() => this.onCloseRequested()}
            />
          )}
          <h2 className={styles.video_modal_add_a_Video}>{t('Select_Blog_Post_Title')}</h2>
          {posts && (
            <ul>
              {posts.map(post => (
                <li key={post.id}>{post.title}</li>
              ))}
            </ul>
          )}
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
  blogAPIUrl: PropTypes.string,
  instance: PropTypes.string,
};

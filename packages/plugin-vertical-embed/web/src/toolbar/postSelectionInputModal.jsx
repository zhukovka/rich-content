import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { CloseIcon, Button } from 'wix-rich-content-editor-common';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/post-selection-input-modal.scss';
import ItemsListComponent from '../components/items-list-component';

export default class PostSelectionInputModal extends Component {
  state = {
    errorMsg: '',
    posts: [],
  };
  styles = mergeStyles({ styles, theme: this.props.theme });

  afterOpenModal = () => { };

  onCloseRequested = () => {
    this.setState({ isOpen: false });
    this.props.helpers.closeModal();
  };

  handleKeyPress = e => {
    if (e.charCode === 13) {
      this.onConfirm();
    }
  };

  getMappedPosts(posts) {
    return posts.map(post => ({
      imageUrl: `https://static.wixstatic.com/media/${post.coverImage.url}`,
      subtitle: new Date(post.lastPublishedDate).toDateString(),
      ...post,
    }));
  }

  fetchPosts = () =>
    fetch(`${this.props.blogAPIUrl}/posts?limit=20`, {
      headers: {
        Accept: 'application/json',
        Authorization: this.props.instance,
      },
    })
      .then(resp => (resp.ok ? resp.json() : {}))
      .then(({ post }) => this.getMappedPosts(post))
      .then(posts => this.setState({ posts }))
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
        <div className={styles.verticalEmbedContainer} data-hook="verticalEmbedModal">
          {!isMobile && (
            <CloseIcon
              className={styles.verticalEmbedModalCloseIcon}
              onClick={() => this.onCloseRequested()}
            />
          )}
          <h2 className={styles.verticalEmbedModalTitle}>{t('Select_Blog_Post_Title')}</h2>
          {posts && posts.length && <ItemsListComponent items={posts}></ItemsListComponent>}
        </div>

        <div className={styles.actionButtonsContainer}>
          <Button type="secondary" className={styles.actionButton} onClick={() => this.onCloseRequested()}>
            Cancel
          </Button>
          <Button className={styles.actionButton} onClick={() => onConfirm()}>
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
  blogAPIUrl: PropTypes.string,
  instance: PropTypes.string,
};

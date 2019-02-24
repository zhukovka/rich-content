import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MDSpinner from 'react-md-spinner';
import { mergeStyles, isVideoUrl, WixUtils } from 'wix-rich-content-common';
import ItemsListComponent from './../components/items-list-component';
import SearchInputComponent from './../components/search-input-component';
import NavbarComponent from './../components/navbar-component';
import { YOUTUBE_API_KEY, YOUTUBE_V3_API_LINK } from './../constants';
import styles from '../../statics/styles/youtube-api-input-modal.scss';

export default class YoutubeApiInputModal extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = {
      loading: true,
      videos: null,
      selectedVideoUrl: '',
      searchTerm: '',
      nextPageToken: '',
      onTextBoxFocus: false,
      didFail: false,
    };
  }
  componentDidMount = () => {
    this.searchYoutube();
  };

  updateComponentData = videoUrl => {
    const { componentData, helpers, pubsub, onConfirm } = this.props;
    if (onConfirm) {
      onConfirm({ ...componentData, youtube: { url: videoUrl } });
    } else {
      pubsub.update('componentData', { youtube: { url: videoUrl } });
    }
    helpers.closeModal();
  };

  searchYoutube = (term, nextPage) => {
    if (isVideoUrl(term)) {
      this.setState({ searchTerm: term });
    } else {
      this.setState({ loading: true, searchTerm: term });
      let pageToken = '';
      if (nextPage) {
        pageToken = 'pageToken=' + this.state.nextPageToken + '&';
      }

      const url = term
        ? YOUTUBE_V3_API_LINK +
          'search?part=snippet&' +
          pageToken +
          'maxResults=50&order=viewCount&q=' +
          term +
          '&type=video&videoDefinition=high&key=' +
          YOUTUBE_API_KEY
        : YOUTUBE_V3_API_LINK +
          'videos?part=snippet&' +
          pageToken +
          'chart=mostPopular&maxResults=50&pageToken=CDIQAA&key=' +
          YOUTUBE_API_KEY;

      fetch(url)
        .then(response => {
          return response.json();
        })
        .then(res => {
          const newVideos = res.items;
          let { videos } = this.state;
          videos = nextPage ? [...this.state.videos, ...newVideos] : newVideos;
          this.setState({
            loading: false,
            videos,
            nextPageToken: res.nextPageToken,
          });
        })
        .catch(() => {
          setTimeout(
            function() {
              this.setState({ loading: false });
            }.bind(this),
            3000
          );
          this.setState({ didFail: true });
        });
    }
  };

  onNextPageClicked = () => {
    const { searchTerm } = this.state;
    this.searchYoutube(searchTerm, true);
  };

  onSearchButtonClicked = term => {
    if (isVideoUrl(term)) {
      this.updateComponentData(term);
    } else {
      this.searchYoutube(term, false);
    }
  };

  handelOnKeyPress = term => {
    this.searchYoutube(term, false);
    const { componentData, helpers, pubsub, onConfirm } = this.props;
    if (isVideoUrl(term)) {
      const youtubeObj = {
        url: term,
      };
      if (onConfirm) {
        onConfirm({ ...componentData, youtube: youtubeObj });
      } else {
        pubsub.update('componentData', { youtube: youtubeObj });
      }
      helpers.closeModal();
    }
  };

  onItemClickedHandler = url => {
    this.setState({ selectedVideoUrl: url });
    if (!WixUtils.isMobile()) {
      this.updateComponentData(url);
    }
  };

  onAddClickedHandler = url => {
    this.updateComponentData(url);
  };

  onBackClickedHandler = () => {
    this.props.helpers.closeModal();
  };

  onSearchTextBoxFocused = isFocus => {
    this.setState({ onTextBoxFocus: isFocus });
  };

  onSearchTextBoxBlured = isBlur => {
    this.setState({ onTextBoxFocus: isBlur });
  };

  renderApiErrorMessage = () => {
    const { t } = this.props;
    return (
      <div className={this.styles.error_message_container}>
        <p>{t('YoutubePlugin_API_ErrorMessage_Title')}</p>
        <p>{t('YoutubePlugin_API_ErrorMessage_Description')}</p>
      </div>
    );
  };

  renderResultNotFoundErrorMessage = () => {
    const { t } = this.props;
    return (
      <div className={this.styles.error_message_container}>
        <p>{t('YoutubePlugin_NoResult_ErrorMessage_Title')}</p>
        <p>{t('YoutubePlugin_NoResult_ErrorMessage_Description')}</p>
      </div>
    );
  };

  render() {
    const { videos, didFail, loading, searchTerm } = this.state;
    const isMobile = WixUtils.isMobile();
    return (
      <div className={this.styles.modal_container}>
        {WixUtils.isMobile() && (
          <NavbarComponent
            selectedVideoUrl={this.state.selectedVideoUrl}
            isTextBoxFocused={this.state.onTextBoxFocus}
            onAddClicked={this.onAddClickedHandler.bind(this)}
            onBackClicked={this.onBackClickedHandler}
            {...this.props}
          />
        )}
        <div className={this.styles.search_modal_container}>
          <SearchInputComponent
            onSearchButtonClicked={this.onSearchButtonClicked.bind(this)}
            selectedVideoUrl={this.state.selectedVideoUrl}
            onKeyPress={this.handelOnKeyPress.bind(this)}
            onSearchTextBoxFocused={this.onSearchTextBoxFocused.bind(this)}
            onSearchTextBoxBlured={this.onSearchTextBoxBlured.bind(this)}
            {...this.props}
          />
          {!videos || (didFail && !isVideoUrl(searchTerm))
            ? !loading && this.renderApiErrorMessage()
            : videos.length === 0 && !isVideoUrl(searchTerm)
            ? !loading && this.renderResultNotFoundErrorMessage()
            : !loading && (
                <ItemsListComponent
                  videos={videos}
                  onItemClickedHandler={this.onItemClickedHandler.bind(this)}
                  isMobile={isMobile}
                  isTextBoxFocused={this.state.onTextBoxFocus}
                  next={this.onNextPageClicked}
                  nextPage={this.state.nextPageToken}
                  loader={<MDSpinner />}
                  searchTerm={this.state.searchTerm}
                  {...this.props}
                />
              )}
        </div>
      </div>
    );
  }
}

YoutubeApiInputModal.propTypes = {
  theme: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
  helpers: PropTypes.object,
  pubsub: PropTypes.object,
  onConfirm: PropTypes.func,
  t: PropTypes.func,
};

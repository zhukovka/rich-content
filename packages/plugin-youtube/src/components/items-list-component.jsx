import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import { mergeStyles } from 'wix-rich-content-common';
import ItemComponent from './item-component';
import { YOUTUBE_URL } from '../constants';
import styles from '../../statics/styles/items-list.scss';
class ItemsListComponent extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = {
      videos: this.props.videos,
      clickedItemVideoUrl: '',
    };
  }

  onItemClicked = url => {
    this.setState({ clickedItemUrl: url });
    this.props.onItemClickedHandler(url);
  };

  render() {
    const { videos, isMobile, isTextBoxFocused } = this.props;
    const items =
      videos &&
      videos.map((video, index) => {
        let videoObj = {
          publisherName: video.snippet.channelTitle,
          publishedDate: video.snippet.publishedAt,
          videoTitle: video.snippet.title,
          thumbnail: video.snippet.thumbnails.default.url,
        };
        let isClicked = false;
        if (!video.id.videoId) {
          videoObj = {
            ...videoObj,
            videoId: video.id,
          };
        } else {
          videoObj = {
            ...videoObj,
            videoId: video.id.videoId,
          };
        }
        if (YOUTUBE_URL + videoObj.videoId === this.state.clickedItemUrl && !isTextBoxFocused) {
          isClicked = true;
        }
        return (
          <ItemComponent
            videoObj={videoObj}
            onItemClicked={this.onItemClicked.bind(this)}
            key={index}
            isClicked={isClicked}
            isMobile={isMobile}
            {...this.props}
          />
        );
      });
    return (
      <Scrollbars
        renderThumbVertical={() => <div className={styles.scrollbar_thumb} />}
        className={styles.customize_scrollbar_container}
        style={{ height: '303px', width: '100%', right: '-25px' }}
      >
        {items}
      </Scrollbars>
    );
  }
}

ItemsListComponent.propTypes = {
  theme: PropTypes.object.isRequired,
  videos: PropTypes.array,
  onItemClickedHandler: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
  isTextBoxFocused: PropTypes.bool,
};

export default ItemsListComponent;

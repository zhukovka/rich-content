import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import InfiniteScroll from 'react-infinite-scroll-component';
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

  loadMore = () => {
    setTimeout(() => {
      this.props.next();
    }, 1500);
  };

  render() {
    const { isMobile, isTextBoxFocused, loader, nextPage } = this.props;
    const { videos } = this.state;
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
      <InfiniteScroll
        dataLength={items.length}
        next={this.loadMore}
        hasMore={nextPage}
        loader={loader}
        height={isMobile ? 'calc(100vh - 102px)' : '330px'}
        style={{ overflowY: 'scroll' }}
        className={this.styles.infinite_scroll_component}
        scrollableTarget="scrollableDiv"
      >
        <Scrollbars
          id="scrollableDiv"
          renderThumbVertical={() => <div className={styles.scrollbar_thumb} />}
          className={styles.customize_scrollbar_container}
          style={{
            // width: isMobile ? '100%' : 'calc(100% + 22px)',
            height: isMobile ? 'calc(100vh - 102px)' : '325px',
          }}
        >
          {items}
        </Scrollbars>
      </InfiniteScroll>
    );
  }
}

ItemsListComponent.propTypes = {
  theme: PropTypes.object.isRequired,
  videos: PropTypes.array,
  onItemClickedHandler: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
  isTextBoxFocused: PropTypes.bool,
  next: PropTypes.func.isRequired,
  nextPage: PropTypes.string,
  loader: PropTypes.Component,
};

export default ItemsListComponent;

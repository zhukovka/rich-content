import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import Unsplash from 'unsplash-js';
import InfiniteScroll from 'react-infinite-scroller';
import MDSpinner from 'react-md-spinner';
import { Scrollbars } from 'react-custom-scrollbars';
import { WAIT_INTERVAL } from '../constants';
import styles from '../../statics/styles/unsplash-selecter.scss';

class UnsplashSelector extends Component {
  constructor(props) {
    super(props);
    const { componentData } = this.props;
    this.state = {
      url: componentData.src || '',
      isLoaded: false,
      hasMoreItems: true,
      images: [],
      page: 0,
      didFail: false
    };
    this.styles = mergeStyles({ styles, theme: this.props.theme });
    this.unsplash = new Unsplash({
      applicationId: this.props.unsplashPublicApiKey,
      secret: this.props.unsplashSecretApiKey,
      callbackUrl: ""
    });
  }

  getImages = (searchTag, page) => {
    if (searchTag) {
      this.unsplash.search.photos(searchTag, page)
        .then(Response => Response.json())
        .then(responseData => {
          if (page > 1) {
            this.setState({
              images: this.state.images.concat(responseData.results),
              hasMoreItems: true,
              page: this.state.page + 1,
              didFail: false
            });
          } else {
            this.setState({
              images: responseData.results, hasMoreItems: true, page: this.state.page + 1, didFail: false
            });
          }
        }).catch(() => {
          this.setState({ didFail: true, hasMoreItems: false });
        });
    } else {
      //Unsplash Trending 
    };

    getMoreImages = () => {
      const searchTag = this.props.searchTag;
      this.getImages(searchTag, this.state.page);
    };

    onClick = image => {
      const imageObj = {
        originalUrl: image.images.original.url,
        stillUrl: image.images.original_still.url,
        height: parseInt(image.images.original.height),
        width: parseInt(image.images.original.width)
      };
      const { componentData, helpers, pubsub, onConfirm, onCloseRequested } = this.props;

      if (onConfirm) {
        onConfirm({ ...componentData, image: imageObj });
      } else {
        pubsub.update('componentData', { image: imageObj });
      }

      if (helpers) {
        helpers.openModal(data => pubsub.update('componentData', { metadata: { ...data } }));
      }

      onCloseRequested();
    };

    handleKeyPress = e => {
      if (e.charCode === 27) {
        this.onClick();
      }
    };

    componentWillReceiveProps(nextProps) {
      if (this.timer !== null) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => this.getImages(nextProps.searchTag), WAIT_INTERVAL);
    }

    componentDidMount() {
      this.timer = null;
    }

    render() {
      const { styles } = this;
      const loader =
        (
          <div className={styles[`unsplash_selecter_spinner_${this.state.images.length ? 'more' : 'empty_modal'}`]}>
            <MDSpinner borderSize={1.5} singleColor="#000000" />
          </div>
        );
      return (
        <div>
          <div className={styles.unsplash_selecter_container}>
            <div className={styles.unsplash_selecter_infinite_scroll_container}>
              <Scrollbars
                renderThumbVertical={() => <div className={styles.unsplash_selecter_scrollbarThumb} />}
                className={styles.unsplash_selecter_customize_scrollbar_container}
              >
                <InfiniteScroll
                  pageStart={0}
                  loadMore={this.getMoreImages.bind(this)}
                  hasMore={this.state.hasMoreItems}
                  loader={(!this.state.didFail) ? loader : null}
                  useWindow={false}
                  className={styles.unsplash_selecter_infinite_scroll}
                >
                  {this.state.images.map((image, i) => {
                    return (
                      <div
                        key={image.id.toString() + i}
                        role="button"
                        tabIndex="0"
                        className={styles.unsplash_selecter_img_container}
                        onKeyPress={this.handleKeyPress}
                        onClick={() => this.onClick(image)}
                      >
                        <img className={styles.unsplash_selecter_img} src={image.urls.thumb} alt={'image'} />
                      </div>
                    );
                  })}
                </InfiniteScroll>
              </Scrollbars>
            </div>
          </div>
          {/* {
          (this.state.didFail && !this.state.images.length) ?
            <div className={styles.unsplash_selecter_error_msg}> {t('UnsplashPlugin_ApiErrorMsg')}</div> : null
        } */}
        </div>
      );
    }
  }
}

UnsplashSelector.propTypes = {
  pubsub: PropTypes.object,
  helpers: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
  searchTag: PropTypes.string,
  images: PropTypes.array,
  onCloseRequested: PropTypes.func,
  onConfirm: PropTypes.func,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
};

export default UnsplashSelector;

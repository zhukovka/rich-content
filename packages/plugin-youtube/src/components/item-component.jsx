import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import { YOUTUBE_URL } from '../constants';
import styles from '../../statics/styles/item.scss';

class ItemComponent extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = {
      isClicked: false,
    };
  }

  componentWillReceiveProps = nextProp => {
    if (this.state.isClicked !== nextProp.isClicked) {
      this.setState({ isClicked: nextProp.isClicked });
    }
  };

  onClickedHandler = () => {
    this.props.onItemClicked(YOUTUBE_URL + this.props.videoObj.videoId);
  };

  render() {
    const { isMobile, videoObj } = this.props;
    const border = isMobile && this.props.isClicked && '5px solid blue';
    return (
      <div
        role="button"
        tabIndex={0}
        style={{ border }}
        className={this.styles.item_container}
        onKeyPress={null}
        onClick={this.onClickedHandler}
      >
        <img src={videoObj.thumbnail} alt="Youtube Thumbnail" />
        <p>{videoObj.videoTitle}</p>
        <p>{videoObj.publisherName}</p>
        <p>{videoObj.publishedDate}</p>
      </div>
    );
  }
}

ItemComponent.propTypes = {
  theme: PropTypes.object.isRequired,
  onItemClicked: PropTypes.func.isRequired,
  videoObj: PropTypes.object.isRequired,
  isClicked: PropTypes.bool,
  isMobile: PropTypes.bool,
  thumbnail: PropTypes.string,
};

export default ItemComponent;

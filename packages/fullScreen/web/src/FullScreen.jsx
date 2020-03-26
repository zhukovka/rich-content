import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { debounce } from 'lodash';
import closeIcon from './icons/close.svg';
import layouts from 'wix-rich-content-plugin-gallery/dist/lib/layout-data-provider';
import resizeMediaUrl from 'wix-rich-content-plugin-gallery/dist/lib/resize-media-url';
import PropTypes from 'prop-types';
import styles from './fullscreen.rtlignore.scss';

const { ProGallery } = require('pro-gallery');

export default class Fullscreen extends Component {
  constructor(props) {
    super(props);
    this.state = { width: window.innerWidth, height: window.innerHeight, index: -1 };
  }
  componentDidMount() {
    document.addEventListener('keydown', this.onEsc);
    this.resizeObserver = new ResizeObserver(this.updateDimensions);
  }

  componentDidUpdate = debounce(() => {
    if (this.props.isOpen && !this.ref) {
      this.ref = document.querySelector('[data-hook=rich-content-fullscreen]');
      this.resizeObserver.observe(this.ref);
    }
  });

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onEsc);
  }

  updateDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  onEsc = event => {
    if (event.key === 'Escape' && this.props.isOpen) {
      this.onClose();
    }
  };

  onClose = () => {
    this.resizeObserver.unobserve(this.ref);
    this.ref = undefined;
    this.setState({ index: -1 }, () => this.props.onClose());
  };

  galleryEventsHandler = (name, data) => {
    if (name === 'CURRENT_ITEM_CHANGED') {
      const index = this.props.images.findIndex(image => image.itemId === data.itemId);
      if (index > -1) {
        this.setState({ index });
      }
    }
  };

  render() {
    const { isOpen, target, backgroundColor, topMargin, foregroundColor, index } = this.props;
    const items = this.props.images;
    let fullscreen = (
      <div
        data-hook={'rich-content-fullscreen'}
        className={styles.fullscreen}
        style={{ ...backgroundColor, ...topMargin }}
      >
        <button
          className={styles.close}
          style={foregroundColor}
          onClick={() => this.onClose()}
          data-hook={'fullscreen-close-button'}
        >
          {closeIcon()}
        </button>
        <ProGallery
          items={items}
          currentIdx={this.state.index === -1 ? index : this.state.index}
          resizeMediaUrl={resizeMediaUrl}
          container={{ width: this.state.width, height: this.state.height }}
          eventsListener={this.galleryEventsHandler}
          styles={{
            ...layouts[5],
            galleryLayout: 5,
            cubeType: 'fit',
            scrollSnap: true,
            videoPlay: 'auto',
            allowSocial: false,
            loveButton: false,
            slideshowInfoSize: 0,
          }}
        />
      </div>
    );

    if (target) {
      fullscreen = ReactDOM.createPortal(fullscreen, target);
    }

    return isOpen ? fullscreen : null;
  }
}

Fullscreen.propTypes = {
  images: PropTypes.array.isRequired,
  isOpen: PropTypes.bool,
  index: PropTypes.number,
  topMargin: PropTypes.object,
  backgroundColor: PropTypes.object,
  foregroundColor: PropTypes.object,
  onClose: PropTypes.func,
  target: PropTypes.instanceOf(PropTypes.element),
};

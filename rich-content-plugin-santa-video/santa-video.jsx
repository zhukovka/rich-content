import React from 'react';
import PropTypes from 'prop-types';
const { ProGallery } = process.env.SANTA ? {} : require('pro-gallery-renderer');

const getDefault = () => ({
  type: 'Component',
  skin: 'wysiwyg.viewer.skins.VideoSkin',
  layout: {
    x: 250,
    y: 264.5,
    fixedPosition: false,
    width: 480,
    height: 277,
    scale: 1,
    rotationInDegrees: 0
  },
  componentType: 'wysiwyg.viewer.components.Video',
  data: {
    type: 'Video',
    metaData: {
      isPreset: false,
      schemaVersion: '1.0',
      isHidden: false
    },
    videoId: 'WWpQK3nQclU',
    videoType: 'YOUTUBE'
  },
  props: {
    type: 'VideoProperties',
    metaData: {
      isPreset: false,
      schemaVersion: '1.0',
      isHidden: false
    },
    autoplay: false,
    loop: false,
    showinfo: false,
    lightTheme: false,
    showControls: 'temp_show'
  },
  style: 'v1',
  mobileStructure: {
    layout: {
      x: 20,
      y: 10,
      fixedPosition: false,
      width: 280,
      height: 162,
      scale: 1,
      rotationInDegrees: 0
    },
    metaData: {
      originalCompId: 'comp-jh7g86bo',
      author: 'duplicate'
    }
  },
  activeModes: {}
});

class SantaVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.stateFromProps(props);

    this.sampleItems = [1, 2, 3].map(i => {
      return {
        metadata: {
          height: 10,
          width: 10
        },
        orderIndex: i,
        itemId: 'sampleItem-' + i,
        url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KTMInWQAAAA1JREFUCB1jePv27X8ACVkDxyMHIvwAAAAASUVORK5CYII='//eslint-disable-line
      };
    });
  }


  render() {
    const { styles, size } = this.state;

    // console.log('Rendering ProGallery', styles);

    return (
      <div ref={elem => this.container = elem}>
        <ProGallery
          styles={styles}
          items={this.getItems()}
          galleryDataSrc={'manuallySetImages'}
          container={size}
          settings={this.props.settings}
        />
      </div>);
  }
}

SantaVideo.propTypes = {
  componentData: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  helpers: PropTypes.object.isRequired,
  settings: PropTypes.object
};

export { SantaVideo, getDefault };

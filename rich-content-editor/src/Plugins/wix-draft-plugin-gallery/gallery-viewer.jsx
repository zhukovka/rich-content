import React from 'react';
import PropTypes from 'prop-types';
const { ProGallery } = process.env.SANTA ? {} : require('pro-gallery-renderer');

const getDefault = () => ({
  items: [],
  styles: {
    galleryLayout: 2,
    gallerySizeType: 'px',
    gallerySizePx: 300,
    oneRow: false,
    cubeRatio: 1,
    galleryThumbnailsAlignment: 'bottom',
    isVertical: false,
    numberOfImagesPerRow: 3,
    imageMargin: 20,
    cubeType: 'fill',
    enableInfiniteScroll: true,
    titlePlacement: 'SHOW_ON_HOVER',
    allowHover: false,
    showArrows: false,
    gridStyle: 1,
    loveButton: false,
    allowSocial: false,
    allowDownload: false
  },
  config: {
    alignment: 'center',
    size: 'fullWidth',
    layout: 'small',
    spacing: 0,
  },
});

class GalleryViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.stateFromProps(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.stateFromProps(nextProps));
    this.updateDimensions();
  }
  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions.bind(this));
    this.updateDimensions();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions.bind(this));
  }

  updateDimensions() {
    if (this.container && this.container.getBoundingClientRect) {
      const width = Math.floor(this.container.getBoundingClientRect().width);
      const height = Math.floor(width * 3 / 4);
      this.setState({ size: { width, height } });
    }
  }

  stateFromProps = props => {
    const defaults = getDefault();
    const items = props.componentData.items || defaults.items;
    const styles = Object.assign(defaults.styles, props.componentData.styles || {});

    return {
      items,
      styles
    };
  };

  render() {
    const { items, styles, size } = this.state;

    // console.log('Rendering ProGallery', styles);

    return (
      <div ref={elem => this.container = elem}>
        <ProGallery styles={styles} items={items} galleryDataSrc={'manuallySetImages'} container={size} />
      </div>);
  }
}

GalleryViewer.propTypes = {
  componentData: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  helpers: PropTypes.object.isRequired
};

export { GalleryViewer, getDefault };

import React from 'react';
import PropTypes from 'prop-types';
import { ProGallery } from 'pro-gallery-renderer';
import 'pro-gallery-renderer/dist/statics/main.min.css';

//eslint-disable-next-line no-unused-vars
const EMPTY_SMALL_PLACEHOLDER = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

const DEFAULTS = {
  items: [],
  //   {
  //     metadata: {
  //       height: 1000,
  //       width: 1920,
  //     },
  //     itemId: '8b72558253b2502b401bb46e5599f22a',
  //     url: '8bb438_1b73a6b067b24175bd087e86613bd00c.jpg',
  //   },
  //   {
  //     metadata: {
  //       height: 5600,
  //       width: 3737,
  //     },
  //     itemId: '2d3b675ea857dc41158bad3b28300824',
  //     url: '8bb438_78ff5e32500d48cdaa22a3f446d68216.jpg',
  //   },
  //   {
  //     metadata: {
  //       height: 3737,
  //       width: 5600,
  //     },
  //     itemId: '860df034014674abd7a2e73abe0b851b',
  //     url: '8bb438_ff062a651e174cf5926fe5c088be1099.jpg',
  //   },
  //   {
  //     metadata: {
  //       height: 333,
  //       width: 500,
  //     },
  //     itemId: '8b72558253b2502b401bb46e5599f22b',
  //     url: '8bb438_bc43580d2f36408f87cf8302a86e5ad4.jpg',
  //   },
  //   {
  //     metadata: {
  //       height: 560,
  //       width: 374,
  //     },
  //     itemId: '2d3b675ea857dc41158bad3b28300825',
  //     url: '8bb438_7dde2abf38e24163b80c11619c357bf1.jpg',
  //   },
  //   {
  //     metadata: {
  //       height: 374,
  //       width: 560,
  //     },
  //     itemId: '860df034014674abd7a2e73abe0b851c',
  //     url: '8bb438_ac190df97cfe4c6d8bcd9ca8b6b3c100.jpg',
  //   },
  // ],
  styles: {
    galleryLayout: 0,
    oneRow: false,
    cubeRatio: 1,
    galleryThumbnailsAlignment: 'bottom',
    isVertical: false,
    numberOfImagesPerRow: 3,
    imageMargin: 5,
    cubeType: 'fill',
    enableInfiniteScroll: true,
    titlePlacement: 'SHOW_ON_HOVER',
    showArrows: false,
    gridStyle: 1,
    loveButton: false,
    allowSocial: false,
    allowDownload: false
  },
  config: {
    alignment: 'center',
    size: 'content',
    layout: 'small',
    spacing: 0,
  },
};

class GalleryComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.stateFromProps(props);

    if (this.props.store) {
      this.props.store.set('handleFilesSelected', this.handleFilesSelected.bind(this));
    }
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
    if (this.container && this.container.clientWidth) {
      const width = this.container.clientWidth;
      const height = width * 3 / 4;
      this.setState({ size: { width, height } });
    }
  }

  stateFromProps = props => {
    const { keyName, isActive } = (props.componentState && props.componentState.activeButton) || {};
    const inEditMode = keyName === 'edit' && isActive;
    const items = props.componentData.items || [];// || DEFAULTS.items;
    const styles = Object.assign(DEFAULTS.styles, props.componentData.styles || {});
    const layout = props.componentData.config && props.componentData.config.layout;
    const layoutWidth = layout === 'large' ? 100 : layout === 'medium' ? 50 : 33;
    const isLoading = (props.componentState && props.componentState.isLoading) || 0;

    const state = {
      items,
      inEditMode,
      layoutWidth,
      styles,
      isLoading
    };

    if (props.componentState) {
      const { userSelectedFiles } = props.componentState;
      if (isLoading <= 0 && userSelectedFiles) {
        //lets continue the uploading process
        if (userSelectedFiles.files && userSelectedFiles.files.length > 0) {
          Object.assign(state, { isLoading: userSelectedFiles.files.length });
          this.handleFilesSelected(userSelectedFiles.files);
        }
        if (this.props.store) {
          setTimeout(() => {
            //needs to be async since this function is called during constructor and we do not want the update to call set state on other components
            this.props.store.update('componentState', { isLoading: true, userSelectedFiles: null });
          }, 0);
        }
      }
    }

    return state;
  }

  setItemInGallery = (item, itemPos) => {
    const shouldAdd = (typeof itemPos === 'undefined');
    let { items } = this.state;
    let itemIdx;
    if (shouldAdd) {
      itemIdx = items.length;
      items = [...items, item];
    } else {
      itemIdx = itemPos;
      items = [...items];
      items[itemPos] = item;
    }
    console.log('New items loaded', items); //eslint-disable-line no-console
    this.setState({ items });
    if (this.props.store) {
      this.props.store.update('componentData', { items });
    }

    return itemIdx;
  }

  handleFilesSelected = (files, itemPos) => {
    Array(...files).forEach(file => {
      const reader = new FileReader();
      reader.onload = e => this.fileLoaded(e, file, itemPos);
      reader.readAsDataURL(file);
    });
  }
  imageLoaded = (event, file, itemPos) => {
    const img = event.target;
    const item = {
      metadata: {
        height: img.height,
        width: img.width,
      },
      itemId: String(event.timeStamp),
      url: img.src,
    };

    const itemIdx = this.setItemInGallery(item, itemPos);
    const { helpers } = this.props;
    const hasFileChangeHelper = helpers && helpers.onFilesChange;

    if (hasFileChangeHelper) {
      helpers.onFilesChange(file, ({ data, error }) => {
        console.log('onFilesChanged happend', data, error); //eslint-disable-line no-console
        const galleryItem = {
          metadata: {
            height: data.height,
            width: data.width,
          },
          itemId: String(data.id),
          url: data.file_name,
        };
        this.setItemInGallery(galleryItem, itemIdx);
      });
    } else {
      console.warn('Missing upload function'); //eslint-disable-line no-console
    }
  }

  fileLoaded = (event, file, itemPos) => {

    const img = new Image();
    img.onload = e => this.imageLoaded(e, file, itemPos);
    img.src = event.target.result;

  };

  render() {
    const { items, styles } = this.state;

    return (
      <div ref={elem => this.container = elem}>
        <ProGallery styles={styles} items={items} galleryDataSrc={'manuallySetImages'} container={this.state.size} />
      </div>);
  }
}

GalleryComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  componentState: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  blockProps: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  helpers: PropTypes.object.isRequired
};

export { GalleryComponent as Component, DEFAULTS };

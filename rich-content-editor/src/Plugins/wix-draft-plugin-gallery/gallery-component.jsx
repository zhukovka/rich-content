import React from 'react';
import PropTypes from 'prop-types';
import { ProGallery } from 'pro-gallery-renderer';
import 'pro-gallery-renderer/dist/statics/main.min.css';

const EMPTY_SMALL_PLACEHOLDER = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

const DEFAULTS = {
  items: [
    {
      metadata: {
        height: 1000,
        width: 1920,
      },
      itemId: '8b72558253b2502b401bb46e5599f22a',
      url: '8bb438_1b73a6b067b24175bd087e86613bd00c.jpg',
    },
    {
      metadata: {
        height: 5600,
        width: 3737,
      },
      itemId: '2d3b675ea857dc41158bad3b28300824',
      url: '8bb438_78ff5e32500d48cdaa22a3f446d68216.jpg',
    },
    {
      metadata: {
        height: 3737,
        width: 5600,
      },
      itemId: '860df034014674abd7a2e73abe0b851b',
      url: '8bb438_ff062a651e174cf5926fe5c088be1099.jpg',
    },
    {
      metadata: {
        height: 333,
        width: 500,
      },
      itemId: '8b72558253b2502b401bb46e5599f22b',
      url: '8bb438_bc43580d2f36408f87cf8302a86e5ad4.jpg',
    },
    {
      metadata: {
        height: 560,
        width: 374,
      },
      itemId: '2d3b675ea857dc41158bad3b28300825',
      url: '8bb438_7dde2abf38e24163b80c11619c357bf1.jpg',
    },
    {
      metadata: {
        height: 374,
        width: 560,
      },
      itemId: '860df034014674abd7a2e73abe0b851c',
      url: '8bb438_ac190df97cfe4c6d8bcd9ca8b6b3c100.jpg',
    },
  ],
  styles: {
    galleryLayout: 0, // OK
    oneRow: false, // scrollDirection OK?
    cubeRatio: 1, // NB: galleryContainer overwrites this while trying to set wixStyle!
    galleryThumbnailsAlignment: 'bottom', // OK
    isVertical: false, // imageOrientation - OK
    numberOfImagesPerRow: 3, // sets fixed columns?
    imageMargin: 5, // spacing - OK
    cubeType: 'fill', // resize: crop/fit - OK
    enableInfiniteScroll: true, // load more button - ?
    titlePlacement: 'SHOW_ON_HOVER', // NB: galleryContainer overwrites this while trying to set wixStyle value!
    showArrows: false,
  },
  config: {
    layout: 'small',
    spacing: 0,
  },
};

class GalleryComponent extends React.Component {
  constructor(props) {
    super(props);
    console.error('GALLERY COMPONENT!');
    this.state = this.stateFromProps(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.stateFromProps(nextProps));
  }

  stateFromProps = props => {
    const componentState = props.componentState || {};

    const { keyName, isActive } = props.componentState.activeButton || {};
    const inEditMode = keyName === 'edit' && isActive;
    const items = props.componentData.items || [];// || DEFAULTS.items;
    const styles = props.componentData.styles || DEFAULTS.styles;
    const layout = props.componentData.config && props.componentData.config.layout;
    const layoutWidth = layout === 'large' ? 100 : layout === 'medium' ? 50 : 33;

    const state = {
      items,
      inEditMode,
      layoutWidth,
      styles,
    };

    const { alreadyLoading, isLoading, userSelectedFiles } = this.getLoadingParams(componentState);
    if (!alreadyLoading) {
      if (isLoading !== true && userSelectedFiles) {
        //lets continue the uploading process
        console.log('userSelectedFiles', userSelectedFiles);
        if (userSelectedFiles.files && userSelectedFiles.files.length > 0) {
          const reader = new FileReader();
          reader.onload = (e) => this.fileLoaded(e, userSelectedFiles.files[0]);
          reader.readAsDataURL(userSelectedFiles.files[0]);
          console.log('2 userSelectedFiles', userSelectedFiles);
          Object.assign(state, { isLoading: true, files: userSelectedFiles.files, dataUrl: EMPTY_SMALL_PLACEHOLDER });
        }
        setTimeout(() => {
          //needs to be async since this function is called during constructor and we do not want the update to call set state on other components
          this.props.store.update('componentState', { isLoading: true, userSelectedFiles: null });
        }, 0);
      }
    }

    return state;
  };

  imageLoaded = (event) => {
    const img = event.target;
    let {items} = this.state;
    items.push({
      metadata: {
        height: img.height,
        width: img.width,
      },
      itemId: event.timestamp,
      url: img.src,
    });
    this.setState({ isLoading: true, files: null, items });
  }

  fileLoaded = (event, file) => {

    const img = new Image();
    img.onload = this.imageLoaded;
    img.src = event.target.result;

    // const files = Array.from(this.state.files);
    // const { helpers } = this.props;
    // const hasFileChangeHelper = helpers && helpers.onFilesChange;
    // if (hasFileChangeHelper) {
    //   helpers.onFilesChange(files, ({ data, error }) => {
    //     const { setData } = this.props.blockProps;
    //     this.props.componentData.item = data;
    //     setData(this.props.componentData);
    //     this.resetLoadingState(error);
    //   });
    // } else {
    //   this.resetLoadingState({ msg: 'Missing upload function' });
    // }
  };

  getLoadingParams = componentState => {
    //check if the file upload is coming on the regular state
    const alreadyLoading = this.state && this.state.isLoading;
    const { isLoading, userSelectedFiles } = componentState;
    return { alreadyLoading, isLoading, userSelectedFiles };
  };

  render() {
    const { items, styles } = this.state;

    return <ProGallery styles={styles} items={items} galleryDataSrc={'manuallySetImages'} />;
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
};

export { GalleryComponent as Component, DEFAULTS };

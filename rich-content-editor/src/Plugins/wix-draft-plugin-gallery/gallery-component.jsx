import React from 'react';
import PropTypes from 'prop-types';
import { GalleryViewer, getDefault } from './gallery-viewer';
//import 'pro-gallery-renderer/dist/statics/main.min.css';

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
  }

  stateFromProps = props => {
    const items = props.componentData.items || [];// || DEFAULTS.items;
    const defaults = getDefault();
    const styles = Object.assign(defaults.styles, props.componentData.styles || {});
    const isLoading = (props.componentState && props.componentState.isLoading) || 0;
    const state = {
      items,
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
  };

  setItemInGallery = (item, itemPos) => {
    const shouldAdd = (typeof itemPos === 'undefined');
    let { items, styles } = this.state;
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
      this.props.store.update('componentData', { items, styles, config: {} });
    }

    return itemIdx;
  };

  handleFilesSelected = (files, itemPos) => {
    Array(...files).forEach(file => {
      const reader = new FileReader();
      reader.onload = e => this.fileLoaded(e, file, itemPos);
      reader.readAsDataURL(file);
    });
  };
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
  };

  fileLoaded = (event, file, itemPos) => {

    const img = new Image();
    img.onload = e => this.imageLoaded(e, file, itemPos);
    img.src = event.target.result;

  };

  render() {

    return (
      <GalleryViewer
        componentData={this.props.componentData}
        onClick={this.props.onClick}
        className={this.props.className}
        theme={this.props.theme}
        helpers={this.props.helpers}
      />);
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

export { GalleryComponent as Component, getDefault };

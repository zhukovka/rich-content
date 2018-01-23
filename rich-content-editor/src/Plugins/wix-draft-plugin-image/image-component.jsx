import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import get from 'lodash/get';
import getImageSrc from './get-image-source';
import Styles from './default-image-styles.scss';

const getDefault = () => ({
  data: {},
  config: {
    alignment: 'center',
    size: 'content',
    showTitle: true,
    showDescription: true,
  },
});

const EMPTY_SMALL_PLACEHOLDER = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

const ImageLoader = (
  { theme, type } //eslint-disable-line react/prop-types
) => (
  <div className={classNames(Styles.loaderOverlay, get(theme, 'loaderOverlay'))}>
    <div className={classNames(Styles.loader, get(theme, 'loader'), { [Styles[type]]: type })} />
  </div>
);

class ImageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({ isMounted: false }, this.stateFromProps(props));
  }

  componentDidMount() {
    this.state.isMounted = true; //eslint-disable-line react/no-direct-mutation-state
  }

  componentWillUnmount() {
    this.state.isMounted = false; //eslint-disable-line react/no-direct-mutation-state
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.stateFromProps(nextProps));
  }

  resetLoadingState = error => {
    //no upload function
    if (this.state.isMounted) {
      this.setState({ isLoading: false, files: null, dataUrl: null, error });
    } else {
      //this is async and sometimes called before the component is mounted, so just place it on the state
      //eslint-disable-next-line react/no-direct-mutation-state
      this.state = Object.assign(this.state, {
        isLoading: false,
        files: null,
        dataUrl: null,
        fileError: error,
      });
    }
    //mark the external state as not loading
    this.props.store.update('componentState', { isLoading: false, userSelectedFiles: null });
  };

  fileLoaded = event => {
    const fileDataUrl = event.target.result;
    const files = Array.from(this.state.files);
    if (this.state.isMounted) {
      this.setState({ isLoading: true, files: null, dataUrl: fileDataUrl });
    } else {
      //this is async and sometimes called before the component is mounted, so just place it on the state
      //eslint-disable-next-line react/no-direct-mutation-state
      this.state = Object.assign(this.state, {
        isLoading: true,
        files: null,
        dataUrl: fileDataUrl,
        fileError: null,
      });
    }
    const { helpers } = this.props;
    const hasFileChangeHelper = helpers && helpers.onFilesChange;
    if (hasFileChangeHelper) {
      helpers.onFilesChange(files, ({ data, error }) => {
        this.props.store.update('componentData', { data });
        this.resetLoadingState(error);
      });
    } else {
      this.resetLoadingState({ msg: 'Missing upload function' });
    }
  };

  stateFromProps = props => {
    const componentState = props.componentState || {};

    const state = {};
    const { alreadyLoading, isLoading, userSelectedFiles } = this.getLoadingParams(componentState);
    if (!alreadyLoading) {
      if (isLoading !== true && userSelectedFiles) {
        //lets continue the uploading process
        if (userSelectedFiles.files && userSelectedFiles.files.length > 0) {
          const reader = new FileReader();
          reader.onload = this.fileLoaded;
          reader.readAsDataURL(userSelectedFiles.files[0]);
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

  getLoadingParams = componentState => {
    //check if the file upload is coming on the regular state
    const alreadyLoading = this.state && this.state.isLoading;
    const { isLoading, userSelectedFiles } = componentState;
    return { alreadyLoading, isLoading, userSelectedFiles };
  };

  getImageSrc(item) {
    const { block, helpers } = this.props;
    let imageUrl;
    if (this.state.dataUrl) {
      imageUrl = this.state.dataUrl;
    } else {
      imageUrl = getImageSrc(item.data, helpers);
    }

    if (!imageUrl) {
      console.error(`image plugin '${block.getKey()}' mounted with invalid image source!`, item); //eslint-disable-line no-console
    }

    return imageUrl;
  }

  renderLoader() {
    if (!this.state.isLoading) {
      return null;
    }
    return <ImageLoader />;
  }

  renderTitle(data, theme) {
    const config = data.config || {};
    return !!config.showTitle && <div className={theme.title}>{(data && data.title) || ''}</div>;
  }
  renderDescription(data, theme) {
    const config = data.config || {};
    return !!config.showDescription && <div className={theme.description}>{(data && data.description) || ''}</div>;
  }

  render() {
    const { componentData, className, onClick, theme } = this.props;
    const data = componentData || getDefault();

    const itemClassName = classNames(Styles.container, className, theme.container);
    const imageClassName = classNames(Styles.image, theme.image);
    const imageSrc = this.getImageSrc(data);
    return (
      <div onClick={onClick} className={itemClassName}>
        <div>
          <img className={imageClassName} src={imageSrc} />
          {this.renderLoader()}
        </div>
        {this.renderTitle(data, theme)}
        {this.renderDescription(data, theme)}
      </div>
    );
  }
}

ImageComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  componentState: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  blockProps: PropTypes.object.isRequired,
  block: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  helpers: PropTypes.object.isRequired,
};

export { ImageComponent as Component, getDefault };

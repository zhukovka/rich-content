import React from 'react';
import PropTypes from 'prop-types';
import { ImageViewer, getDefault } from './image-viewer';


const EMPTY_SMALL_PLACEHOLDER = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

class ImageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({ isMounted: false }, this.stateFromProps(props));

    if (this.props.store) {
      this.props.store.set('handleFilesSelected', this.handleFilesSelected.bind(this));
    }
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

  stateFromProps = props => {
    const componentState = props.componentState || {};

    let state = {};
    const { alreadyLoading, isLoading, userSelectedFiles } = this.getLoadingParams(componentState);
    if (!alreadyLoading) {
      if (isLoading !== true && userSelectedFiles) {
        //lets continue the uploading process
        if (userSelectedFiles.files && userSelectedFiles.files.length > 0) {
          state = this.handleFilesSelected(userSelectedFiles.files);
        }
        setTimeout(() => {
          //needs to be async since this function is called during constructor and we do not want the update to call set state on other components
          this.props.store.update('componentState', { isLoading: true, userSelectedFiles: null });
        }, 0);
      }
    }

    return state;
  };

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

  fileLoaded = (event, files) => {
    const fileDataUrl = event.target.result;
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
        this.setState({ files });
        this.props.store.update('componentData', { item: data });
        this.resetLoadingState(error);
      });
    } else {
      this.resetLoadingState({ msg: 'Missing upload function' });
    }
  };

  handleFilesSelected = files => {
    const state = {};
    const reader = new FileReader();
    reader.onload = e => this.fileLoaded(e, files);
    reader.readAsDataURL(files[0]);
    Object.assign(state, { isLoading: true, files, dataUrl: EMPTY_SMALL_PLACEHOLDER });

    return state;
  };

  getLoadingParams = componentState => {
    //check if the file upload is coming on the regular state
    const alreadyLoading = this.state && this.state.isLoading;
    const { isLoading, userSelectedFiles } = componentState;
    return { alreadyLoading, isLoading, userSelectedFiles };
  };

  render() {
    return (
      <ImageViewer
        componentData={this.props.componentData}
        onClick={this.props.onClick}
        className={this.props.className}
        theme={this.props.theme}
        helpers={this.props.helpers}
        isLoading={this.state.isLoading}
        dataUrl={this.state.dataUrl}
      />
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

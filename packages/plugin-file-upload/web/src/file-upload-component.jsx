import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FileUploadViewer from './file-upload-viewer';

const DEFAULTS = Object.freeze({
  config: {
    alignment: 'center',
    size: 'small',
  },
});

class FileUploadComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
    const { block, store } = this.props;

    if (store) {
      const blockKey = block.getKey();
      store.setBlockHandler('handleFilesSelected', blockKey, this.handleFilesSelected);
      store.setBlockHandler('handleFilesAdded', blockKey, this.handleFilesAdded);
    }
  }

  componentDidMount() {
    this.setState(this.stateFromProps(this.props));
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.stateFromProps(nextProps));
  }

  stateFromProps = props => {
    let state = {};
    const componentState = props.componentState || {};
    const { alreadyLoading, isLoading, userSelectedFiles } = this.getLoadingParams(componentState);
    if (!alreadyLoading) {
      if (isLoading !== true && userSelectedFiles) {
        if (userSelectedFiles.files && userSelectedFiles.files.length > 0) {
          state = this.handleFilesSelected(userSelectedFiles.files);
        }
        this.props.store.update('componentState', { isLoading: true, userSelectedFiles: null });
      }
    }
    return state;
  };

  handleFilesSelected = files => {
    const { onFileSelected } = this.props.settings;
    if (onFileSelected && files.length > 0) {
      this.setState({ isLoading: true, error: null });
      onFileSelected(files[0], ({ data, error }) => this.handleFilesAdded({ data, error }));
    } else {
      this.resetLoadingState({ msg: 'Missing upload function' });
    }
  };

  handleFilesAdded = ({ data, error }) => {
    if (error) {
      this.resetLoadingState(error);
      return;
    }
    const { setData } = this.props.blockProps;
    const componentData = { ...this.props.componentData, ...data };
    setData(componentData);
    this.props.store.update('componentData', { ...data });
    this.resetLoadingState();
  };

  getLoadingParams = componentState => {
    const alreadyLoading = this.state && this.state.isLoading;
    const { isLoading, userSelectedFiles } = componentState;
    return { alreadyLoading, isLoading, userSelectedFiles };
  };

  resetLoadingState = error => {
    this.setState({ isLoading: false, errorMsg: error?.msg });
    //mark the external state as not loading
    this.props.store.update('componentState', { isLoading: false, userSelectedFiles: null });
  };

  render() {
    const { componentData, theme, setComponentUrl } = this.props;
    const { errorMsg, isLoading } = this.state;

    return (
      <FileUploadViewer
        componentData={componentData}
        isLoading={isLoading}
        error={errorMsg}
        theme={theme}
        setComponentUrl={setComponentUrl}
      />
    );
  }
}

FileUploadComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  componentState: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  block: PropTypes.object.isRequired,
  blockProps: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  setComponentUrl: PropTypes.func,
};

FileUploadComponent.defaultProps = {
  settings: {},
};

export { FileUploadComponent as Component, DEFAULTS };

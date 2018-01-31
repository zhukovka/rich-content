import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '../../../Common/theme-provider';
import { Image } from 'stylable-components/dist/src/components/image';
import { SettingsSection } from './settings-section';
import getImageSrc from '../get-image-source';
import InputWithLabel from '../stylable-base/input-with-label';
import ImageSettingsFooter from './image-settings-footer';
import FileInput from '~/Common/file-input';
import Styles from './image-settings.scss';

class ImageSettings extends Component {
  constructor(props) {
    super(props);
    this.state = this.propsToState(props);
  }

  propsToState(props) {
    const initialImageState = { ...props.componentData.item };
    return {
      item: props.componentData.item,
      initialImageState,
    };
  }

  revertComponentData () {
    const { componentData, helpers, pubsub } = this.props;
    const { initialImageState } = this.state;
    if (initialImageState) {
      componentData.item = initialImageState;
      pubsub.set('componentData', componentData);
    }
    this.setState({ item: initialImageState });

    helpers.closeExternalModal();
  }

  imageMetadataUpdated = (image, value) => {
    image.metadata = Object.assign({}, image.metadata, value);
    this.setState({ item: this.state.item });
  };

  onReplace () {
    console.error('On replace!!!!'); //eslint-disable-line no-console
  }

  handleFileChange = event => {
    if (event.target.files.length > 0) {
      // const handleFilesSelected = this.props.store.get('handleFilesSelected');
      // handleFilesSelected(event.target.files);
      window.console.log('asdfasdfadsf');

    }
    event.target.value = ''; //reset the input
  };

  replaceItem(event) {
    this.handleFileChange(event);
  }

  // deleteImage() {
  //   this.setState({
  //     item: null,
  //   });
  // }

  render() {
    const { componentData, helpers } = this.props;
    const { item } = componentData;
    const { metadata = {} } = item;

    return (
      <ThemeProvider theme={'default'}>
        <div className={Styles.imageSettings}>
          <div className={Styles.content}>
            <h3 className={Styles.title}>Image Settings</h3>
            <SettingsSection>
              <Image resizeMode={'contain'} className={Styles.image} src={getImageSrc(item, helpers)} />
            </SettingsSection>
            <div className={Styles.manageImageGrid}>
              <FileInput className={Styles.replace} onChange={this.replaceItem.bind(this)}>
                <span>{'Replace'}</span>
              </FileInput>
              <button className={Styles.delete} onClick={() => this.deleteImage()}>
                <span>{'Delete'}</span>
              </button>
            </div>
            <SettingsSection className={Styles.imageSettingsSection}>
              <InputWithLabel
                label={'Alt Text'}
                placeholder={'Add image Alt Text'}
                value={metadata.altText || ''}
                onChange={event => this.imageMetadataUpdated(item, { altText: event.target.value })}
              />
            </SettingsSection>
            <SettingsSection className={Styles.imageSettingsSection}>
              <InputWithLabel
                label={'Caption'}
                placeholder={'Enter your image caption (optional)'}
                value={metadata.caption || ''}
                onChange={event => this.imageMetadataUpdated(item, { caption: event.target.value })}
              />
            </SettingsSection>
            <SettingsSection className={Styles.imageSettingsSection}>
              <InputWithLabel
                label={'Link'}
                placeholder={'Add a link'}
                value={metadata.link || ''}
                onChange={event => this.imageMetadataUpdated(item, { link: event.target.value })}
              />
            </SettingsSection>
          </div>
          <ImageSettingsFooter cancel={() => this.revertComponentData()} save={() => helpers.closeExternalModal()}/>
        </div>
      </ThemeProvider>
    );
  }
}
ImageSettings.propTypes = {
  componentData: PropTypes.any.isRequired,
  helpers: PropTypes.object,
  pubsub: PropTypes.any,
};

export default ImageSettings;

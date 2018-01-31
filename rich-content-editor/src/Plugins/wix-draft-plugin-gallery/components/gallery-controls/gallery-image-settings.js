import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import findIndex from 'lodash/findIndex';
import { Image } from 'stylable-components/dist/src/components/image';

import { SettingsSection } from './settings-section';
import InputWithLabel from '../stylable-base/input-with-label';
import GallerySettingsFooter from './gallery-settings-footer';
import FileInput from '~/Common/file-input';
import Styles from './gallery-image-settings.scss';

class ImageSettings extends Component {
  state = this.propsToState(this.props);

  propsToState(props) {
    return {
      selectedIndex: props.selectedImage ?
        findIndex(props.images, i => props.selectedImage.url === i.url) : -1,
      images: props.images
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState(this.propsToState(nextProps));
    }
  }

  componentDidMount() {
    this.initialImageState = this.props.images.map(i => ({ ...i }));
  }

  deleteImage(selectedImage) {
    const images = this.state.images.filter(i => i.url !== selectedImage.url);
    this.setState({
      images,
      selectedIndex: Math.min(this.state.selectedIndex, images.length - 1)
    });
  }

  imageMetadataUpdated = (image, value) => {
    image.metadata = Object.assign({}, image.metadata, value);
    this.setState({ images: this.state.images });
  };

  replaceItem(event) {
    const { handleFileChange } = this.props;
    const itemIdx = this.state.selectedIndex;
    handleFileChange(event, itemIdx);
  }

  render() {
    const { onSave, onCancel } = this.props;
    const { images } = this.state;
    const selectedImage = images[this.state.selectedIndex];

    return (
      <div className={Styles.imageSettings}>
        <div className={Styles.content}>
          <h3 className={classnames(Styles.backButton, Styles.title)} onClick={() => onCancel(this.initialImageState)}>← Image Settings</h3>
          <SettingsSection>
            <Image resizeMode={'contain'} className={Styles.image} src={`https://static.wixstatic.com/${selectedImage.url}`} />
            <div className={Styles['image-nav']}>
              <i
                className={classnames(Styles.previous, this.state.selectedIndex === 0 ? Styles.hidden : '')}
                onClick={() => this.setState({ selectedIndex: this.state.selectedIndex - 1 })}
              />
              <i
                className={classnames(Styles.next, this.state.selectedIndex === images.length - 1 ? Styles.hidden : '')}
                onClick={() => this.setState({ selectedIndex: this.state.selectedIndex + 1 })}
              />
            </div>
          </SettingsSection>
          <div className={Styles.manageImageGrid}>
            <FileInput className={Styles.replace} onChange={this.replaceItem.bind(this)}>
              <span>{'Replace'}</span>
            </FileInput>
            <button className={Styles.delete} onClick={() => this.deleteImage(selectedImage)}>
              <span>{'Delete'}</span>
            </button>
          </div>
          <SettingsSection className={Styles['image-settings-section']}>
            <InputWithLabel
              label={'Title'}
              placeholder={'Add image title'}
              value={selectedImage.metadata.title || ''}
              onChange={event => this.imageMetadataUpdated(selectedImage, { title: event.target.value })}
            />
          </SettingsSection>
          <SettingsSection className={Styles['image-settings-section']}>
            <InputWithLabel
              label={'Description'}
              placeholder={'Describe your image'}
              value={selectedImage.metadata.description || ''}
              onChange={event => this.imageMetadataUpdated(selectedImage, { description: event.target.value })}
            />
          </SettingsSection>
          <SettingsSection className={Styles['image-settings-section']}>
            <InputWithLabel
              label={'Link'}
              placeholder={'Add a link'}
              value={selectedImage.metadata.link || ''}
              onChange={event => this.imageMetadataUpdated(selectedImage, { link: event.target.value })}
            />
          </SettingsSection>
          <SettingsSection>
            <hr />
          </SettingsSection>
        </div>
        <GallerySettingsFooter cancel={() => onCancel(this.initialImageState)} save={() => onSave(this.state.images)} />
      </div>
    );
  }
}
ImageSettings.propTypes = {
  selectedImage: PropTypes.any.isRequired,
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  handleFileChange: PropTypes.func.isRequired
};

export default ImageSettings;

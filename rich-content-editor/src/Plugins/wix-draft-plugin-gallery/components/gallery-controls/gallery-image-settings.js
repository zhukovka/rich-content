import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import findIndex from 'lodash/findIndex';
import { Image } from 'stylable-components/dist/src/components/image';

import SettingsSection from '~/Components/SettingsSection';
import InputWithLabel from '../stylable-base/input-with-label';
import GallerySettingsFooter from './gallery-settings-footer';
import FileInput from '~/Components/FileInput';
import { mergeStyles } from '~/Utils';
import styles from './gallery-image-settings.scss';

class ImageSettings extends Component {

  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = this.propsToState(this.props);
  }

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
    const styles = this.styles;
    const { onSave, onCancel, theme } = this.props;
    const { images } = this.state;
    const selectedImage = images[this.state.selectedIndex];

    return (
      <div className={styles.imageSettings}>
        <div className={styles.imageSettings_content}>
          <h3
            className={classnames(styles.imageSettings_backButton, styles.imageSettings_title)}
            onClick={() => onCancel(this.initialImageState)}
          >← Image Settings
          </h3>
          <div className={styles.imageSettings_scrollContainer}>
            <SettingsSection theme={theme}>
              <Image resizeMode={'contain'} className={styles.imageSettings_image} src={`https://static.wixstatic.com/${selectedImage.url}`} />
              <div className={styles.imageSettings_nav}>
                <i
                  className={classnames(styles.imageSettings_previous, this.state.selectedIndex === 0 ? styles.imageSettings_hidden : '')}
                  onClick={() => this.setState({ selectedIndex: this.state.selectedIndex - 1 })}
                />
                <i
                  className={classnames(styles.imageSettings_next, this.state.selectedIndex === images.length - 1 ? styles.imageSettings_hidden : '')}
                  onClick={() => this.setState({ selectedIndex: this.state.selectedIndex + 1 })}
                />
              </div>
            </SettingsSection>
            <div className={styles.imageSettings_manageImageGrid}>
              <FileInput className={styles.imageSettings_replace} onChange={this.replaceItem.bind(this)}>
                <span className={styles.imageSettings_replace_text}>{'Replace'}</span>
              </FileInput>
              <button className={styles.imageSettings_delete} onClick={() => this.deleteImage(selectedImage)}>
                <span className={styles.imageSettings_delete_text}>{'Delete'}</span>
              </button>
            </div>
            <SettingsSection theme={theme} className={styles.imageSettings_section}>
              <InputWithLabel
                theme={theme}
                label={'Title'}
                placeholder={'Add image title'}
                value={selectedImage.metadata.title || ''}
                onChange={event => this.imageMetadataUpdated(selectedImage, { title: event.target.value })}
              />
            </SettingsSection>
            <SettingsSection theme={theme} className={styles.imageSettings_section}>
              <InputWithLabel
                theme={theme}
                label={'Description'}
                placeholder={'Describe your image'}
                value={selectedImage.metadata.description || ''}
                onChange={event => this.imageMetadataUpdated(selectedImage, { description: event.target.value })}
              />
            </SettingsSection>
            <SettingsSection theme={theme} className={styles.imageSettings_section}>
              <InputWithLabel
                theme={theme}
                label={'Link'}
                placeholder={'Add a link'}
                value={selectedImage.metadata.link || ''}
                onChange={event => this.imageMetadataUpdated(selectedImage, { link: event.target.value })}
              />
            </SettingsSection>
          </div>
        </div>
        <GallerySettingsFooter theme={theme} cancel={() => onCancel(this.initialImageState)} save={() => onSave(this.state.images)} />
      </div>
    );
  }
}
ImageSettings.propTypes = {
  selectedImage: PropTypes.any.isRequired,
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  handleFileChange: PropTypes.func.isRequired
};

export default ImageSettings;

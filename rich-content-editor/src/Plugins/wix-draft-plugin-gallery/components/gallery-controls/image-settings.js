import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import findIndex from 'lodash/findIndex';
import { Image } from 'stylable-components/dist/src/components/image';

import { SettingsSection } from './settings-section';
import InputWithLabel from '../stylable-base/input-with-label';
import style from './image-settings.scss';
import GallerySettingsFooter from './gallery-settings-footer';

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

  imageMetadataUpdated = (image, value) => {
    image.metadata = Object.assign({}, image.metadata, value);
    this.setState({ images: this.state.images });
  };

  render() {
    const { images, onSave, onCancel } = this.props;
    const selectedImage = images[this.state.selectedIndex];

    return (
      <div className={style['image-settings']}>
        <h3 className={classnames(style.title, style['back-button'])} onClick={() => onCancel(this.initialImageState)}>← Image Settings</h3>
        <SettingsSection>
          <Image resizeMode={'cover'} className={style.image} src={`https://static.wixstatic.com/${selectedImage.url}`} />
          <div className={style['image-nav']}>
            <i
              className={classnames(style.previous, this.state.selectedIndex === 0 ? style.hidden : '')}
              onClick={() => this.setState({ selectedIndex: this.state.selectedIndex - 1 })}
            />
            <i
              className={classnames(style.next, this.state.selectedIndex === images.length - 1 ? style.hidden : '')}
              onClick={() => this.setState({ selectedIndex: this.state.selectedIndex + 1 })}
            />
          </div>
        </SettingsSection>
        <div className={style['manage-image-grid']}>
          <button className={style.replace}>
            <span>{'Replace'}</span>
          </button>
          <button className={style.delete}>
            <span>{'Delete'}</span>
          </button>
        </div>
        <SettingsSection className={style['image-settings-section']}>
          <InputWithLabel
            label={'Title'}
            placeholder={'Add image title'}
            value={selectedImage.metadata.title || ''}
            onChange={event => this.imageMetadataUpdated(selectedImage, { title: event.target.value })}
          />
        </SettingsSection>
        <SettingsSection className={style['image-settings-section']}>
          <InputWithLabel
            label={'Description'}
            placeholder={'Describe your image'}
            value={selectedImage.metadata.description || ''}
            onChange={event => this.imageMetadataUpdated(selectedImage, { description: event.target.value })}
          />
        </SettingsSection>
        <SettingsSection className={style['image-settings-section']}>
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
};

export default ImageSettings;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Image } from 'stylable-components/dist/src/components/image';
import { SettingsSection } from './settings-section';
import getImageSrc from '../get-image-source';
import InputWithLabel from '../stylable-base/input-with-label';
import GallerySettingsFooter from './gallery-settings-footer';
import style from './image-settings.scss';

class ImageSettings extends Component {
  constructor(props) {
    super(props);
    this.state = this.propsToState(props);
  }

  propsToState(props) {
    return {
      item: props.componentData.item,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState(this.propsToState(nextProps));
    }
  }

  componentDidMount() {
    this.initialImageState = this.props.componentData.item;
  }

  imageMetadataUpdated = (image, value) => {
    image.metadata = Object.assign({}, image.metadata, value);
    this.setState({ item: this.state.item });
  };

  onReplace () {
    console.error('On replace!!!!'); //eslint-disable-line no-console
  }

  onDelete () {
    console.error('On delete!!!!'); //eslint-disable-line no-console
  }
  render() {
    const { componentData, onSave, onCancel, helpers } = this.props;
    const { data } = componentData;
    const { metadata = {} } = data;

    return (
      <div className={style['image-settings']}>
        <h3 className={classnames(style.title, style['back-button'])} onClick={() => onCancel(this.initialImageState)}>Image Settings</h3>
        <SettingsSection>
          <Image resizeMode={'cover'} className={style.image} src={getImageSrc(data, helpers)} />
        </SettingsSection>
        <div className={style['manage-image-grid']}>
          <button className={style.replace} onClick={() => this.onReplace()}>
            <span>{'Replace'}</span>
          </button>
          <button className={style.delete} onClick={() => this.onDelete()}>
            <span>{'Delete'}</span>
          </button>
        </div>
        <SettingsSection className={style['image-settings-section']}>
          <InputWithLabel
            label={'Alt Text'}
            placeholder={'Add image Alt Text'}
            value={metadata.altText || ''}
            onChange={event => this.imageMetadataUpdated(data, { altText: event.target.value })}
          />
        </SettingsSection>
        <SettingsSection className={style['image-settings-section']}>
          <InputWithLabel
            label={'Caption'}
            placeholder={'Enter your image caption (optional)'}
            value={metadata.caption || ''}
            onChange={event => this.imageMetadataUpdated(data, { caption: event.target.value })}
          />
        </SettingsSection>
        <SettingsSection className={style['image-settings-section']}>
          <InputWithLabel
            label={'Link'}
            placeholder={'Add a link'}
            value={metadata.link || ''}
            onChange={event => this.imageMetadataUpdated(data, { link: event.target.value })}
          />
        </SettingsSection>
        <SettingsSection>
          <hr />
        </SettingsSection>
        <GallerySettingsFooter cancel={() => onCancel(this.initialImageState)} save={() => onSave(this.state.item)} />
      </div>
    );
  }
}
ImageSettings.propTypes = {
  componentData: PropTypes.any.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  helpers: PropTypes.object
};

export default ImageSettings;

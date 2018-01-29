import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '../../../Common/theme-provider';
import { Image } from 'stylable-components/dist/src/components/image';
import { SettingsSection } from './settings-section';
import getImageSrc from '../get-image-source';
import InputWithLabel from '../stylable-base/input-with-label';
import GallerySettingsFooter from './gallery-settings-footer';
import Styles from './image-settings.scss';

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
    const { item } = componentData;
    const { metadata = {} } = item;

    return (
      <ThemeProvider theme={'default'}>
        <div className={Styles.imageSettings}>
          <div className={Styles.content}>
            <div className={Styles.title} onClick={() => onCancel(this.initialImageState)}>Image Settings</div>
            <SettingsSection>
              <Image resizeMode={'cover'} className={Styles.image} src={getImageSrc(item, helpers)} />
            </SettingsSection>
            <div className={Styles.manageImageGrid}>
              <button className={Styles.replace} onClick={() => this.onReplace()}>
                <span>{'Replace'}</span>
              </button>
              <button className={Styles.delete} onClick={() => this.onDelete()}>
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
          <GallerySettingsFooter cancel={() => onCancel(this.initialImageState)} save={() => onSave(this.state.item)} />
        </div>
      </ThemeProvider>
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

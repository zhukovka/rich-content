import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Image } from 'stylable-components/dist/src/components/image';

import { SettingsSection } from './settings-section';
import InputWithLabel from '../stylable-base/input-with-label';
import style from '../gallery-settings-modal.scss';
import GallerySettingsFooter from './gallery-settings-footer';

class ImageSettings extends Component {
  render() {
    const { visible, onVisibilityToggle, image } = this.props;

    if (visible) {
      return (
        <div className={style['image-settings']}>
          <h3 className={classnames(style.title, style['back-button'])} onClick={() => onVisibilityToggle()}>← Image Settings</h3>
          <Image resizeMode={'cover'} className={style.image} src={`https://static.wixstatic.com/${image.url}`} />
          <i className={style.left} onClick={() => {}}/>
          <i className={style.right} onClick={() => {}} />
          <div className={style['manage-image-grid']}>
            <button />
            <button />
          </div>
          <SettingsSection className={style['image-settings-section']}>
            <h3>UNDER CONSTRUCTION!</h3>
          </SettingsSection>
          <SettingsSection className={style['image-settings-section']}>
            <InputWithLabel label={'Title'} placeholder={'Add image title'} value={''}/>
          </SettingsSection>
          <SettingsSection className={style['image-settings-section']}>
            <InputWithLabel label={'Description'} placeholder={'Describe your image'} value={''}/>
          </SettingsSection>
          <SettingsSection className={style['image-settings-section']}>
            <InputWithLabel label={'Link'} placeholder={'Add a link'} value={''}/>
          </SettingsSection>
          <SettingsSection>
            <hr />
          </SettingsSection>
          <GallerySettingsFooter cancel={() => {}} save={() => onVisibilityToggle()} />
        </div>
      );
    }
    return null;
  }
}
ImageSettings.propTypes = {
  image: PropTypes.any.isRequired,
  visible: PropTypes.bool.isRequired,
  onVisibilityToggle: PropTypes.func.isRequired,
};

export default ImageSettings;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './image-settings.scss';
import SettingsSection from './settings-section';

class ImageSettings extends Component {
  render() {
    return (
      <SettingsSection>
        <img src={'https://static.wixstatic.com/media/8bb438_3ff588618aa2433faec50a49cd48fef5.jpg'} />
      </SettingsSection>
    );
  }
}
// ImageSettings.propTypes = {
//   imageData: PropTypes.object.isRequired,
// };

export default ImageSettings;


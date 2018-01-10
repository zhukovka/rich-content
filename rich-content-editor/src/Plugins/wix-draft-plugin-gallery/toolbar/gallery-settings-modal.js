import React, { Component } from 'react';

import styles from '~/Styles/gallery-settings.scss';

export class GallerySettingsModal extends Component {
  render() {
    return (
      <div className={styles['gallery-settings']}>
        <h3>Gallery Settings</h3>
      </div>
    );
  }
}

export default GallerySettingsModal;

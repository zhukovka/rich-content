import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'stylable-components/dist/src/components/button';

import { mergeStyles } from '~/Utils';
import styles from './gallery-settings-footer.scss';

class GallerySettingsFooter extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  render() {
    const { save, cancel } = this.props;
    return (
      <div className={this.styles.gallerySettings_footer}>
        <Button onClick={() => cancel()} className={this.styles.gallerySettings_cancel}>
          {'Cancel'}
        </Button>
        <Button className={this.styles.gallerySettings_save} onClick={() => save()}>{'Save'}</Button>
      </div>
    );
  }
}

GallerySettingsFooter.propTypes = {
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};

export default GallerySettingsFooter;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Button } from 'stylable-components/dist/src/components/button';

import styles from './gallery-settings-footer.scss';

class GallerySettingsFooter extends Component {
  render() {
    const { save, cancel } = this.props;
    return (
      <div className={styles.footer}>
        <Button onClick={() => cancel()} className={classnames(styles.sidebarButton, styles.cancel)}>
          {'Cancel'}
        </Button>
        <Button className={styles.sidebarButton} onClick={() => save()}>{'Done'}</Button>
      </div>
    );
  }
}

GallerySettingsFooter.propTypes = {
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
};

export default GallerySettingsFooter;

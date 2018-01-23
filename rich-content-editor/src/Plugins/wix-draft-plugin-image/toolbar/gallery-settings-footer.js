import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'stylable-components/dist/src/components/button';

import style from './gallery-settings-footer.scss';

class GallerySettingsFooter extends Component {
  render() {
    const { save, cancel } = this.props;
    return (
      <div className={style.footer}>
        <Button onClick={() => cancel()} className={style.cancel}>
          {'Cancel'}
        </Button>
        <Button onClick={() => save()}>{'Done'}</Button>
      </div>
    );
  }
}

GallerySettingsFooter.propTypes = {
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
};

export default GallerySettingsFooter;

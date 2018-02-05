import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classNames';
import style from './gallery-settings-mobile-header.scss';
import MoreIcon from '../../icons/more.svg';

class GallerySettingsMobileHeader extends Component {
  render() {
    const { save, cancel } = this.props;
    return (
      <div>
        <div className={style.headerPlaceholder} />
        <div className={style.header}>
          <a onClick={() => cancel()} className={classNames(style.button, style.cancel)}>{'Cancel'}</a>
          <a onClick={() => {}} className={classNames(style.button, style.menu)}><MoreIcon/></a>
          <a onClick={() => save()} className={classNames(style.button, style.done)}>{'Save'}</a>
        </div>
      </div>
    );
  }
}

GallerySettingsMobileHeader.propTypes = {
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
};

export default GallerySettingsMobileHeader;

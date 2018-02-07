import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles } from '~/Utils';
import styles from './gallery-settings-mobile-header.scss';
import MoreIcon from '../../icons/more.svg';
import { SelectionList } from 'stylable-components/dist/src/components/selection-list';

class GallerySettingsMobileHeader extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = {
      showMenu: false
    };
  }
  render() {
    const { save, cancel, saveName, cancelName, switchTab, otherTab } = this.props;
    return (
      <div>
        <div className={this.styles.gallerySettingsMobileHeader_headerPlaceholder} />
        <div className={this.styles.gallerySettingsMobileHeader_header}>
          <a
            onClick={() => cancel()} className={classNames(this.styles.gallerySettingsMobileHeader_button,
              this.styles.gallerySettingsMobileHeader_cancel)}
          >{cancelName || 'Cancel'}
          </a>
          {otherTab ?
            <a
              onClick={() => this.setState({ showMenu: !this.state.showMenu })}
              className={classNames(this.styles.gallerySettingsMobileHeader_button, this.styles.gallerySettingsMobileHeader_menuIcon)}
            ><MoreIcon/>
            </a> : null}
          <a
            onClick={() => save()} className={classNames(this.styles.gallerySettingsMobileHeader_button,
              this.styles.gallerySettingsMobileHeader_done)}
          >{saveName || 'Save'}
          </a>
        </div>
        {this.state.showMenu ? (
          <div className={this.styles.gallerySettingsMobileHeader_menu}>
            <SelectionList
              dataSource={[
                otherTab,
              ]}
              value={''}
              onChange={() => {
                this.setState({ showMenu: false });
                switchTab();
              }}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

GallerySettingsMobileHeader.propTypes = {
  hide: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  cancel: PropTypes.func.isRequired,
  switchTab: PropTypes.func,
  otherTab: PropTypes.string,
  saveName: PropTypes.string,
  cancelName: PropTypes.string,
};

export default GallerySettingsMobileHeader;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles } from '~/Utils';
import styles from './image-settings-mobile-header.scss';
import MoreIcon from './icons/more.svg';
import SelectionList from '~/Components/SelectionList';

class ImageSettingsMobileHeader extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = {
      showMenu: false
    };
  }
  render() {
    const { save, cancel, saveName, cancelName, switchTab, otherTab, theme } = this.props;
    return (
      <div>
        <div className={this.styles.imageSettingsMobileHeader_headerPlaceholder} />
        <div className={this.styles.imageSettingsMobileHeader_header}>
          <a
            onClick={() => cancel()} className={classNames(this.styles.imageSettingsMobileHeader_button,
              this.styles.imageSettingsMobileHeader_cancel)}
          >{cancelName || 'Cancel'}
          </a>
          {otherTab ?
            <a
              onClick={() => this.setState({ showMenu: !this.state.showMenu })}
              className={classNames(this.styles.imageSettingsMobileHeader_button, this.styles.imageSettingsMobileHeader_menuIcon)}
            ><MoreIcon/>
            </a> : null}
          <a
            onClick={() => save()} className={classNames(this.styles.imageSettingsMobileHeader_button,
              this.styles.imageSettingsMobileHeader_done)}
          >{saveName || 'Save'}
          </a>
        </div>
        {this.state.showMenu ? (
          <div className={this.styles.imageSettingsMobileHeader_menu}>
            <SelectionList
              theme={theme}
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

ImageSettingsMobileHeader.propTypes = {
  hide: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  cancel: PropTypes.func.isRequired,
  switchTab: PropTypes.func,
  otherTab: PropTypes.string,
  saveName: PropTypes.string,
  cancelName: PropTypes.string,
};

export default ImageSettingsMobileHeader;

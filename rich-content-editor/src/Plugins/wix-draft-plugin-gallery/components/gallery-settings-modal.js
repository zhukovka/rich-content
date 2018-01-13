import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'stylable-components/dist/src/components/tabs';

import { WixThemeProvider } from '../../../Common/wix-theme-provider';
import LayoutSelector from './gallery-controls/layouts-selector';
import style from './gallery-settings-modal.scss';
import { ItemsPerRow, Spacing } from './gallery-controls/sliders';
import GallerySettingsFooter from './gallery-controls/gallery-settings-footer';
import { ThumbnailResize, TitleButtonPlacement } from './gallery-controls/radio-groups';
import ImageRatioSelector from './gallery-controls/image-ratio-selector';
import LoadMoreToggle from './gallery-controls/toggles';

class ManageMediaSection extends Component {
  render() {
    return <div>Organize Media</div>;
  }
}

class AdvancedSettingsSection extends Component {
  applyGallerySetting = setting => {
    const { data, store } = this.props;
    const componentData = { ...data, config: Object.assign({}, data.config, setting) };
    store.set('componentData', componentData);
  };

  render() {
    const { data } = this.props;
    return (
      <div>
        <div className={style.section}>
          <label>Layouts</label>
          <LayoutSelector value={'Grid'} onChange={layout => this.applyGallerySetting({ layout })} />
          <hr />
        </div>
        <div className={style.section}>
          <ItemsPerRow value={3} onChange={() => {}} />
          <Spacing value={data.config.spacing} onChange={event => this.applyGallerySetting({ spacing: event.value })} />
          <hr />
        </div>
        <div className={style.section}>
          <ThumbnailResize onChange={() => {}} value={'Fit'} />
          <hr />
        </div>
        <div className={style.section}>
          <TitleButtonPlacement onChange={() => {}} value={'Hover'} />
          <hr />
        </div>
        <div className={style.section}>
          <ImageRatioSelector value={'16:9'} />
          <hr />
        </div>
        <div className={style.section}>
          <LoadMoreToggle value onChange={() => {}} />
          <hr />
        </div>
      </div>
    );
  }
}

AdvancedSettingsSection.propTypes = {
  data: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

export class GallerySettingsModal extends Component {
  render() {
    const { activeTab, componentData, store, helpers } = this.props;
    return (
      <WixThemeProvider>
        <h3>Gallery Settings</h3>
        <Tabs value={activeTab}>
          <Tab label={'Organize Media'} value={'manage_media'}>
            <ManageMediaSection />
          </Tab>
          <Tab label={'Advanced Settings'} value={'advanced_settings'}>
            <AdvancedSettingsSection data={componentData} store={store} />
          </Tab>
        </Tabs>
        <GallerySettingsFooter cancel={() => helpers.closeExternalModal()} save={() => {}} />
      </WixThemeProvider>
    );
  }
}

GallerySettingsModal.propTypes = {
  activeTab: PropTypes.oneOf(['manage_media', 'advanced_settings']),
  componentData: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  helpers: PropTypes.object.isRequired,
};

export default GallerySettingsModal;

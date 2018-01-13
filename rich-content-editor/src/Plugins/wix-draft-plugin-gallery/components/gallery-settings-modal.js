import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'stylable-components/dist/src/components/tabs';

import { WixThemeProvider } from '../../../Common/wix-theme-provider';
import LayoutSelector from './gallery-controls/layouts-selector';
import style from './gallery-settings-modal.scss';
import GallerySettingsFooter from './gallery-controls/gallery-settings-footer';
import LayoutControlsSection from './layout-controls-section';
import { SettingsSection } from './gallery-controls/settings-section';
class ManageMediaSection extends Component {
  render() {
    return <div>Organize Media</div>;
  }
}

class AdvancedSettingsSection extends Component {
  state = { layout: 'grid' };

  applyGallerySetting = setting => {
    const { data, store } = this.props;
    const componentData = { ...data, config: Object.assign({}, data.config, setting) };
    store.set('componentData', componentData);
  };

  switchLayout = layout => {
    this.setState({ layout });
    this.applyGallerySetting({ layout });
  };

  render() {
    const { data, store } = this.props;
    return (
      <div>
        <SettingsSection>
          <label>Layouts</label>
          <LayoutSelector value={this.state.layout} onChange={layout => this.switchLayout(layout.value)} />
          <hr />
        </SettingsSection>
        <LayoutControlsSection layout={this.state.layout} data={data} store={store} />
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
        <h3 className={style.title}>Gallery Settings</h3>
        <Tabs value={activeTab}>
          <Tab label={'Organize Media'} value={'manage_media'}>
            <ManageMediaSection />
          </Tab>
          <Tab label={'Advanced Settings'} value={'advanced_settings'}>
            <AdvancedSettingsSection data={componentData} store={store} />
          </Tab>
        </Tabs>
        <SettingsSection>
          <hr />
        </SettingsSection>
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

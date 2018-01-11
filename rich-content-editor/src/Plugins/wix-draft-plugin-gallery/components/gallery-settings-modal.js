import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'stylable-components/dist/src/components/tabs';

import { WixThemeProvider } from '../../../Common/wix-theme-provider';
import LayoutSelector from './layouts-selector';
import style from './gallery-settings-modal.scss';
import SliderWithInput from './slider-with-input';

class ManageMediaSection extends Component {
  render() {
    return <div>Organize Media</div>;
  }
}

class AdvancedSettingsSection extends Component {
  render() {
    const { data } = this.props;
    return (
      <div>
        <div className={style.section}>
          <label>Layouts</label>
          <LayoutSelector initLayout={'Grid'} data={data} />
          <hr />
        </div>
        <div className={style.section}>
          <SliderWithInput value={3} max={5} label={'Items per row:'} />
          <SliderWithInput value={50} label={'Spacing between items:'} />
          <hr />
        </div>
      </div>
    );
  }
}

AdvancedSettingsSection.propTypes = {
  data: PropTypes.object.isRequired,
};

export class GallerySettingsModal extends Component {
  render() {
    const { activeTab, componentData } = this.props;
    return (
      <WixThemeProvider>
        <h3>Gallery Settings</h3>
        <Tabs value={activeTab}>
          <Tab label={'Organize Media'} value={'manage_media'}>
            <ManageMediaSection />
          </Tab>
          <Tab label={'Advanced Settings'} value={'advanced_settings'}>
            <AdvancedSettingsSection data={componentData} />
          </Tab>
        </Tabs>
      </WixThemeProvider>
    );
  }
}

GallerySettingsModal.propTypes = {
  activeTab: PropTypes.oneOf(['manage_media', 'advanced_settings']),
  componentData: PropTypes.object.isRequired,
};

export default GallerySettingsModal;

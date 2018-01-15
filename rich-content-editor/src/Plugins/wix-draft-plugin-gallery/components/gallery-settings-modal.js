import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'stylable-components/dist/src/components/tabs';

import { ThemeProvider } from '../../../Common/theme-provider';
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
  applyGallerySetting = setting => {
    const { data, store } = this.props;
    const componentData = { ...data, styles: Object.assign({}, data.styles, setting) };
    store.set('componentData', componentData);
  };

  getValueFromComponentStyles = name => this.props.data.styles[name];

  render() {
    const { data, store } = this.props;
    return (
      <div>
        <SettingsSection>
          <label>Layouts</label>
          <LayoutSelector
            value={this.getValueFromComponentStyles('galleryLayout')}
            onChange={event => this.applyGallerySetting({ galleryLayout: event.value })}
          />
          <hr />
        </SettingsSection>
        <LayoutControlsSection layout={this.getValueFromComponentStyles('galleryLayout')} data={data} store={store} />
      </div>
    );
  }
}

AdvancedSettingsSection.propTypes = {
  data: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

export class GallerySettingsModal extends Component {
  componentDidMount() {
    this.props.pubsub.subscribe('componentData', this.onComponentUpdate);
  }

  componentWillUnmount() {
    this.props.pubsub.unsubscribe('componentData', this.onComponentUpdate);
  }

  onComponentUpdate = () => this.forceUpdate();

  render() {
    const { activeTab, pubsub, helpers } = this.props;
    const componentData = pubsub.get('componentData');
    console.log('MODAL_RENDER: ', componentData);
    return (
      <ThemeProvider theme={'default'}>
        <h3 className={style.title}>Gallery Settings</h3>
        <Tabs value={activeTab}>
          <Tab label={'Organize Media'} value={'manage_media'}>
            <ManageMediaSection />
          </Tab>
          <Tab label={'Advanced Settings'} value={'advanced_settings'}>
            <AdvancedSettingsSection data={componentData} store={pubsub.store} />
          </Tab>
        </Tabs>
        <SettingsSection>
          <hr />
        </SettingsSection>
        <GallerySettingsFooter cancel={() => helpers.closeExternalModal()} save={() => {}} />
      </ThemeProvider>
    );
  }
}

GallerySettingsModal.propTypes = {
  activeTab: PropTypes.oneOf(['manage_media', 'advanced_settings']),
  componentData: PropTypes.object.isRequired,
  helpers: PropTypes.object.isRequired,
  pubsub: PropTypes.any.isRequired,
};

export default GallerySettingsModal;

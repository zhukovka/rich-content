import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'stylable-components/dist/src/components/tabs';

import { mergeStyles } from '~/Utils';
import { ThemeProvider } from '~/Components/ThemeProvider';
import LayoutSelector from './gallery-controls/layouts-selector';
import styles from './gallery-settings-modal.scss';
import SettingsPanelFooter from '~/Components/SettingsPanelFooter';
import LayoutControlsSection from './layout-controls-section';
import SettingsSection from '~/Components/SettingsSection';
import { SortableComponent } from './gallery-controls/gallery-items-sortable';
import layoutData from '../layout-data-provider';
import GallerySettingsMobileHeader from './gallery-controls/gallery-settings-mobile-header';

class ManageMediaSection extends Component {

  applyItems = items => {
    const { data, store } = this.props;
    const componentData = { ...data, items };
    store.set('componentData', componentData);
  };

  handleFileChange = (event, itemPos) => {
    if (event.target.files.length > 0) {
      const handleFilesSelected = this.props.store.get('handleFilesSelected');
      handleFilesSelected(event.target.files, itemPos);
    }
    event.target.value = ''; //reset the input
  };

  render() {
    return (
      <div>
        <SortableComponent
          theme={this.props.theme}
          items={this.props.data.items}
          onItemsChange={this.applyItems}
          handleFileChange={this.handleFileChange}
          isMobile={this.props.isMobile}
        />
      </div>
    );
  }
}

ManageMediaSection.propTypes = {
  data: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  isMobile: PropTypes.bool
};

class AdvancedSettingsSection extends Component {
  applyGallerySetting = setting => {
    const { data, store } = this.props;
    const componentData = {
      ...data,
      styles: Object.assign({}, data.styles, setting)
    };
    store.set('componentData', componentData);
  };

  switchLayout = layout => {
    const layoutStyles = Object.assign(
      {},
      layout,
      layoutData[layout.galleryLayout]
    );
    this.applyGallerySetting(layoutStyles);
  };

  getValueFromComponentStyles = name => this.props.data.styles[name];

  render() {
    const { data, store, isMobile, theme } = this.props;
    return (
      <div className={isMobile ? styles.gallerySettings_settingsContainerMobile : styles.gallerySettings_settingsContainer}>
        <SettingsSection theme={theme}>
          <LayoutSelector
            theme={theme}
            value={this.getValueFromComponentStyles('galleryLayout')}
            onChange={value => this.switchLayout({ galleryLayout: value })}
            isMobile={isMobile}
          />
        </SettingsSection>
        <LayoutControlsSection
          theme={theme}
          layout={this.getValueFromComponentStyles('galleryLayout')}
          data={data}
          store={store}
          isMobile={isMobile}
        />
      </div>
    );
  }
}

AdvancedSettingsSection.propTypes = {
  data: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  isMobile: PropTypes.bool,
  theme: PropTypes.object.isRequired,
};

export class GallerySettingsModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeTab: this.props.activeTab
    };
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.switchTab = this.switchTab.bind(this);
  }

  componentDidMount() {
    this.props.pubsub.subscribe('componentData', this.onComponentUpdate);
    this.setState({
      initComponentData: this.props.pubsub.get('componentData')
    });
  }

  componentWillUnmount() {
    this.props.pubsub.unsubscribe('componentData', this.onComponentUpdate);
  }

  onComponentUpdate = () => this.forceUpdate();

  revertComponentData = () => {
    const { pubsub, helpers } = this.props;
    if (this.state.initComponentData) {
      pubsub.set('componentData', this.state.initComponentData);
    }

    helpers.closeExternalModal();
  };

  otherTab() {
    return this.state.activeTab === 'manage_media' ? 'advanced_settings' : 'manage_media';
  }

  switchTab() {
    const otherTab = this.otherTab();
    this.setState({ activeTab: otherTab });
  }

  tabName(tab) {
    /* eslint-disable camelcase */
    return {
      manage_media: 'Organize Media',
      advanced_settings: 'Advanced Settings',
    }[tab];
  }

  render() {
    const styles = this.styles;
    const { pubsub, helpers, isMobile } = this.props;
    const { activeTab } = this.state;
    const componentData = pubsub.get('componentData');
    // console.log('MODAL_RENDER: ', componentData);

    if (isMobile) {
      // console.log('Rendering mobile settings');
      /* eslint-disable max-len */
      return (
        <ThemeProvider theme={'rce'}>
          <GallerySettingsMobileHeader
            theme={this.props.theme}
            cancel={() => this.revertComponentData()}
            save={() => helpers.closeExternalModal()}
            switchTab={this.switchTab}
            otherTab={this.tabName(this.otherTab())}
          />
          {activeTab === 'manage_media' ? <ManageMediaSection data={componentData} store={pubsub.store} isMobile theme={this.props.theme}/> : null }
          {activeTab === 'advanced_settings' ? <AdvancedSettingsSection theme={this.props.theme} data={componentData} store={pubsub.store} isMobile/> : null }
        </ThemeProvider>
      );
    } else {
      return (
        <ThemeProvider theme={'rce'}>
          <h3 className={styles.gallerySettings_title}>Gallery Settings</h3>
          <div className={styles.gallerySettings}>
            <Tabs value={activeTab}>
              <Tab label={this.tabName('manage_media')} value={'manage_media'}>
                <ManageMediaSection data={componentData} store={pubsub.store} theme={this.props.theme}/>
              </Tab>
              <Tab label={this.tabName('advanced_settings')} value={'advanced_settings'}>
                <AdvancedSettingsSection theme={this.props.theme} data={componentData} store={pubsub.store}/>
              </Tab>
            </Tabs>
          </div>
          <SettingsPanelFooter cancel={() => this.revertComponentData()} save={() => helpers.closeExternalModal()} theme={this.props.theme}/>
        </ThemeProvider>
      );
    }
  }
}

GallerySettingsModal.propTypes = {
  activeTab: PropTypes.oneOf(['manage_media', 'advanced_settings']),
  componentData: PropTypes.object.isRequired,
  helpers: PropTypes.object.isRequired,
  pubsub: PropTypes.any.isRequired,
  isMobile: PropTypes.bool,
  theme: PropTypes.object.isRequired,
};

export default GallerySettingsModal;

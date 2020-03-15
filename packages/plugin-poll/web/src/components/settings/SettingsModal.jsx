import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { SettingsPanelFooter, Tabs, Tab, FocusManager } from 'wix-rich-content-editor-common';

import { TABS } from './constants';

import { DesignSettingsSection } from './DesignSettingsSection';
import { LayoutSettingsSection } from './LayoutSettingsSection';
import { PollSettingsSection } from './PollSettingsSection';

export class SettingsModal extends Component {
  state = {
    activeTab: TABS.SETTINGS,
    componentData: this.props.componentData,
  };

  handleTabChange = activeTab => this.setState({ activeTab });

  restoreChanges = () => {
    const { pubsub, helpers } = this.props;
    const { componentData } = this.state;

    pubsub.update('componentData', componentData);

    helpers.closeModal();
  };

  render() {
    const { activeTab } = this.state;
    const { pubsub, helpers, t, languageDir, theme } = this.props;
    const componentData = pubsub.store.get('componentData');

    return (
      <FocusManager dir={languageDir}>
        <h3>Poll Settings</h3>

        <Tabs value={activeTab} theme={this.props.theme} onTabSelected={this.handleTabChange}>
          <Tab label="Layout" value={TABS.LAYOUT}>
            <LayoutSettingsSection />
          </Tab>
          <Tab label="Design" value={TABS.DESIGN}>
            <DesignSettingsSection
              theme={theme}
              store={pubsub.store}
              componentData={componentData}
              t={t}
            />
          </Tab>
          <Tab label="Settings" value={TABS.SETTINGS}>
            <PollSettingsSection
              theme={theme}
              store={pubsub.store}
              componentData={componentData}
              t={t}
            />
          </Tab>
        </Tabs>

        <SettingsPanelFooter
          fixed
          cancel={this.restoreChanges}
          save={helpers.closeModal}
          theme={this.props.theme}
          t={t}
        />
      </FocusManager>
    );
  }
}

SettingsModal.propTypes = {
  componentData: PropTypes.object.isRequired,
  helpers: PropTypes.object.isRequired,
  pubsub: PropTypes.any.isRequired,
  isMobile: PropTypes.bool,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
  relValue: PropTypes.string,
  anchorTarget: PropTypes.string,
  languageDir: PropTypes.string,
};

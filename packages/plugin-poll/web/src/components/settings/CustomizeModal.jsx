import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { SettingsPanelFooter, Tabs, Tab, FocusManager } from 'wix-rich-content-editor-common';

import { TABS } from './constants';

import { DesignSettingsSection } from './design-settings-section';
import { LayoutSettingsSection } from './layout-settings-section';

import styles from './poll-settings-modal.scss';

export class CustomizeModal extends Component {
  state = {
    activeTab: TABS.DESIGN,
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
        <div className={styles.header}>
          <h3 className={styles.title}>Customization</h3>
        </div>

        <Tabs value={activeTab} theme={theme} onTabSelected={this.handleTabChange}>
          <Tab label={t('Poll_PollSettings_Tab_Design_TabName')} value={TABS.DESIGN} theme={theme}>
            <DesignSettingsSection
              theme={theme}
              store={pubsub.store}
              componentData={componentData}
              t={t}
            />
          </Tab>
          <Tab label={t('Poll_PollSettings_Tab_Layout_TabName')} value={TABS.LAYOUT} theme={theme}>
            <LayoutSettingsSection
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

CustomizeModal.propTypes = {
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
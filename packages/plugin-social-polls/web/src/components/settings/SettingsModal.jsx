import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { SettingsPanelFooter, Tabs, Tab, FocusManager } from 'wix-rich-content-editor-common';

import { TABS } from './constants';

import { DesignSettingsSection } from './design-settings-section';
import { LayoutSettingsSection } from './layout-settings-section';
import { PollSettingsSection } from './poll-settings-section';

import styles from './poll-settings-modal.scss';

export class SettingsModal extends Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    componentData: PropTypes.object.isRequired,
    helpers: PropTypes.object.isRequired,
    uiSettings: PropTypes.object.isRequired,
    pubsub: PropTypes.any.isRequired,
    isMobile: PropTypes.bool,
    theme: PropTypes.object.isRequired,
    t: PropTypes.func,
    relValue: PropTypes.string,
    anchorTarget: PropTypes.string,
    languageDir: PropTypes.string,
  };

  static defaultProps = {
    activeTab: TABS.LAYOUT,
  };

  state = {
    activeTab: this.props.activeTab,
    componentData: this.props.componentData,
  };

  handleTabChange = activeTab => this.setState({ activeTab });

  restoreChanges = () => {
    const { pubsub, helpers } = this.props;
    const { componentData } = this.state;

    pubsub.update('componentData', componentData);

    helpers.closeModal();
  };

  componentDidMount() {
    this.props.pubsub.subscribe('componentData', this.onComponentUpdate);
  }

  componentWillUnmount() {
    this.props.pubsub.unsubscribe('componentData', this.onComponentUpdate);
  }

  onComponentUpdate = () => this.forceUpdate();

  render() {
    const { activeTab } = this.state;
    const { pubsub, helpers, t, languageDir, theme, uiSettings } = this.props;

    const componentData = pubsub.store.get('componentData');

    return (
      <FocusManager dir={languageDir}>
        <div className={styles.header}>
          <h3 className={styles.title}>{t('Poll_PollSettings_Common_Header')}</h3>
        </div>

        <Tabs value={activeTab} theme={theme} onTabSelected={this.handleTabChange}>
          <Tab label={t('Poll_PollSettings_Tab_Layout_TabName')} value={TABS.LAYOUT} theme={theme}>
            <LayoutSettingsSection
              theme={theme}
              store={pubsub.store}
              componentData={componentData}
              uiSettings={uiSettings}
              t={t}
            />
          </Tab>
          <Tab label={t('Poll_PollSettings_Tab_Design_TabName')} value={TABS.DESIGN} theme={theme}>
            <DesignSettingsSection
              theme={theme}
              store={pubsub.store}
              componentData={componentData}
              uiSettings={uiSettings}
              t={t}
            />
          </Tab>
          <Tab
            label={t('Poll_PollSettings_Tab_Settings_TabName')}
            value={TABS.SETTINGS}
            theme={theme}
          >
            <PollSettingsSection
              theme={theme}
              store={pubsub.store}
              componentData={componentData}
              uiSettings={uiSettings}
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

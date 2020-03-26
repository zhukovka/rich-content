import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { SettingsPanelFooter, FocusManager } from 'wix-rich-content-editor-common';
import { PollSettingsSection } from './poll-settings-section';

import styles from './poll-settings-modal.scss';

export class SettingsModal extends Component {
  state = {
    componentData: this.props.componentData,
  };

  restoreChanges = () => {
    const { pubsub, helpers } = this.props;
    const { componentData } = this.state;

    pubsub.update('componentData', componentData);

    helpers.closeModal();
  };

  render() {
    const { pubsub, helpers, t, languageDir, theme } = this.props;
    const componentData = pubsub.store.get('componentData');

    return (
      <FocusManager dir={languageDir}>
        <div className={styles.header}>
          <h3 className={styles.title}>Settings</h3>
        </div>

        <PollSettingsSection
          theme={theme}
          store={pubsub.store}
          componentData={componentData}
          t={t}
        />

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

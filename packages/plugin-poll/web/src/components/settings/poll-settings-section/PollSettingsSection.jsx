import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Dropdown, Checkbox } from 'wix-rich-content-editor-common';
import { mergeStyles } from 'wix-rich-content-common';

import { MEMBER_ROLES } from '../../../constants';
import styles from './poll-settings-section.scss';

export class PollSettingsSection extends Component {
  styles = mergeStyles({ styles, theme: this.props.theme });

  VOTE_ROLE_OPTIONS = [
    {
      value: MEMBER_ROLES.SITE_MEMBERS,
      label: this.props.t('Poll_PollSettings_Tab_Settings_VotePermission_SiteMember'),
    },
    {
      value: MEMBER_ROLES.ALL,
      label: this.props.t('Poll_PollSettings_Tab_Settings_VotePermission_All'),
    },
  ];

  VIEW_ROLE_OPTIONS = [
    {
      value: MEMBER_ROLES.ALL,
      label: this.props.t('Poll_PollSettings_Tab_Settings_VotePermission_All'),
    },
    {
      value: MEMBER_ROLES.VOTERS,
      label: this.props.t('Poll_PollSettings_Tab_Settings_ResultsPermission_Voters'),
    },
    {
      value: MEMBER_ROLES.ME,
      label: this.props.t('Poll_PollSettings_Tab_Settings_ResultsPermission_Owner'),
    },
  ];

  updateSettings(settings) {
    this.props.store.update('componentData', {
      poll: {
        settings,
      },
    });
  }

  handleMultiChange = event => this.updateSettings({ multipleVotes: event.target.checked });

  handleSecretChange = event => this.updateSettings({ votersDisplay: event.target.checked });

  handleVoteAllowedChange = () => this.updateSettings();

  handleVoteRoleChange = option => this.updateSettings({ voteRole: option.value });

  handleViewRoleChange = option => this.updateSettings({ viewRole: option.value });

  getVoteRoleValue = () => {
    const { voteRole } = this.props.componentData.poll.settings;

    return this.VOTE_ROLE_OPTIONS.find(option => option.value === voteRole);
  };

  getViewRoleValue = () => {
    const { viewRole } = this.props.componentData.poll.settings;

    return (
      this.VIEW_ROLE_OPTIONS.find(option => option.value === viewRole) || this.VIEW_ROLE_OPTIONS[0]
    );
  };

  render() {
    const { componentData, t } = this.props;

    return (
      <section className={styles.section}>
        <p>{t('Poll_PollSettings_Tab_Settings_VotePermission_Title')}</p>
        <Dropdown
          theme={this.styles}
          options={this.VOTE_ROLE_OPTIONS}
          getValue={this.getVoteRoleValue}
          onChange={this.handleVoteRoleChange}
        />
        <p>{t('Poll_PollSettings_Tab_Settings_ResultsPermission_Title')}</p>
        <Dropdown
          theme={this.styles}
          options={this.VIEW_ROLE_OPTIONS}
          getValue={this.getViewRoleValue}
          onChange={this.handleViewRoleChange}
        />

        <Checkbox
          label={t('Poll_PollSettings_Tab_Settings_VoterVisibility')}
          checked={componentData.poll.settings.votersDisplay}
          onChange={this.handleSecretChange}
          contentForInfoIcon={t('Poll_PollSettings_Tab_Settings_VoterVisibility_Tooltip')}
        />

        <Checkbox
          label={t('Poll_PollSettings_Tab_Settings_Multiselect')}
          checked={componentData.poll.settings.multipleVotes}
          onChange={this.handleMultiChange}
        />
      </section>
    );
  }
}

PollSettingsSection.propTypes = {
  theme: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

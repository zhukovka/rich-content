import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Checkbox, Separator, RadioGroup } from 'wix-rich-content-editor-common';
import { mergeStyles } from 'wix-rich-content-common';

import { MEMBER_ROLES, VISIBILITY } from '../../../constants';
import styles from './poll-settings-section.scss';

export class PollSettingsSection extends Component {
  styles = mergeStyles({ styles, theme: this.props.theme });

  VOTE_ROLE_OPTIONS = [
    {
      value: MEMBER_ROLES.SITE_MEMBERS,
      labelText: this.props.t(
        'Poll_PollSettings_Tab_Settings_Section_Voting_Permission_SiteMember'
      ),
    },
    {
      value: MEMBER_ROLES.ALL,
      labelText: this.props.t('Poll_PollSettings_Tab_Settings_Section_Voting_Permission_All'),
    },
  ];

  VIEW_ROLE_OPTIONS = [
    {
      value: VISIBILITY.ALWAYS,
      labelText: this.props.t('Poll_PollSettings_Tab_Settings_Section_Results_Permission_All'),
    },
    {
      value: VISIBILITY.VOTERS,
      labelText: this.props.t('Poll_PollSettings_Tab_Settings_Section_Results_Permission_Voters'),
    },
    {
      value: VISIBILITY.ME,
      labelText: this.props.t('Poll_PollSettings_Tab_Settings_Section_Results_Permission_Owner'),
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

  handleAnonymousChange = event => this.updateSettings({ anonymous: !event.target.checked });

  handleVoteRoleChange = voteRole => this.updateSettings({ voteRole });

  handleViewRoleChange = resultsVisibility => this.updateSettings({ resultsVisibility });

  render() {
    const { componentData, t } = this.props;

    return (
      <section className={styles.section}>
        <h3 className={styles.title}>
          {t('Poll_PollSettings_Tab_Settings_Section_Voting_Header')}
        </h3>
        <p className={styles.label}>
          {t('Poll_PollSettings_Tab_Settings_Section_Voting_Permission_Title')}
        </p>

        <RadioGroup
          name="voteRole"
          theme={this.styles}
          value={componentData.poll.settings.voteRole}
          onChange={this.handleVoteRoleChange}
          dataSource={this.VOTE_ROLE_OPTIONS}
          className={styles.radioPanel}
        />

        <Checkbox
          label={t('Poll_PollSettings_Tab_Settings_Section_Voting_Multiselect')}
          checked={componentData.poll.settings.multipleVotes}
          onChange={this.handleMultiChange}
          theme={this.styles}
        />

        <Separator horizontal className={styles.separator} />

        <h3 className={styles.title}>
          {t('Poll_PollSettings_Tab_Settings_Section_Results_Header')}
        </h3>

        <p className={styles.label}>
          {t('Poll_PollSettings_Tab_Settings_Section_Results_Permission_Title')}
        </p>

        <RadioGroup
          name="resultsVisibility"
          theme={this.styles}
          value={componentData.poll.settings.resultsVisibility}
          onChange={this.handleViewRoleChange}
          dataSource={this.VIEW_ROLE_OPTIONS}
          className={styles.radioPanel}
        />

        <Checkbox
          label={t('Poll_PollSettings_Tab_Settings_Section_Results_VoteVisibility')}
          theme={this.styles}
          checked={componentData.poll.settings.votersDisplay}
          onChange={this.handleSecretChange}
        />

        <Checkbox
          label={t('Poll_PollSettings_Tab_Settings_Section_Results_VoterAnonymous')}
          theme={this.styles}
          checked={!componentData.poll.settings.anonymous}
          onChange={this.handleAnonymousChange}
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

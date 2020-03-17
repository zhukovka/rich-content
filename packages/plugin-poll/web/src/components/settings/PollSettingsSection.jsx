import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Dropdown, Checkbox } from 'wix-rich-content-editor-common';
import { mergeStyles } from 'wix-rich-content-common';

import { MEMBER_ROLES } from '../../constants';
import styles from './poll-settings-section.scss';

export class PollSettingsSection extends Component {
  styles = mergeStyles({ styles, theme: this.props.theme });

  VOTE_ROLE_OPTIONS = [
    {
      value: MEMBER_ROLES.SITE_MEMBER,
      label: 'Site Member',
    },
    {
      value: MEMBER_ROLES.EVERYONE,
      label: 'Everyone',
    },
  ];

  VIEW_ROLE_OPTIONS = [
    {
      value: MEMBER_ROLES.EVERYONE,
      label: 'Everyone',
    },
    {
      value: MEMBER_ROLES.VOTERS,
      label: 'Voters',
    },
    {
      value: MEMBER_ROLES.ME,
      label: 'Only Me',
    },
  ];

  updateSettings(settings) {
    this.props.store.update('componentData', {
      poll: {
        settings,
      },
    });
  }

  handleMultiChange = event => this.updateSettings({ multipleChoice: event.target.checked });

  handleSecretChange = event => this.updateSettings({ secret: event.target.checked });

  handleVoteAllowedChange = () => this.updateSettings();

  handleVoteRoleChange = option => this.updateSettings({ voteRole: option.value });

  handleViewRoleChange = option => this.updateSettings({ viewRole: option.value });

  getVoteRoleValue = () => {
    const { voteRole } = this.props.componentData.poll.settings;

    return this.VOTE_ROLE_OPTIONS.find(option => option.value === voteRole);
  };

  getViewRoleValue = () => {
    const { viewRole } = this.props.componentData.poll.settings;

    return this.VIEW_ROLE_OPTIONS.find(option => option.value === viewRole);
  };

  render() {
    const { componentData } = this.props;

    return (
      <section>
        <p>Who can vote?</p>
        <Dropdown
          theme={this.styles}
          options={this.VOTE_ROLE_OPTIONS}
          getValue={this.getVoteRoleValue}
          onChange={this.handleVoteRoleChange}
        />
        <p>Who can see the results?</p>
        <Dropdown
          theme={this.styles}
          options={this.VIEW_ROLE_OPTIONS}
          getValue={this.getViewRoleValue}
          onChange={this.handleViewRoleChange}
        />

        <Checkbox
          label="Hide who voted"
          checked={componentData.poll.settings.secret}
          onChange={this.handleSecretChange}
        />

        <Checkbox
          label="Allow multi-select"
          checked={componentData.poll.settings.multipleChoice}
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
};

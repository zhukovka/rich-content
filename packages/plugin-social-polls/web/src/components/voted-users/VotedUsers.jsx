import React, { PureComponent } from 'react';

import { withRCEHelpers } from '../rce-helpers-context';

import { VotedUsersProps } from './types';

import styles from './voted-users.scss';

class VotedUsersComponent extends PureComponent {
  static propTypes = {
    ...VotedUsersProps,
  };

  getSiteMember(id) {
    const siteMembers = this.props.rce.getSiteMembers?.() || [];
    return siteMembers.find(siteMember => siteMember.siteMemberId === id);
  }

  getSiteMembers() {
    const { rce, option, showVoters } = this.props;
    const siteMembers = rce.getSiteMembers?.() || [];

    if (!showVoters || !siteMembers) {
      return [];
    }

    return option.latestVoters?.map(this.getSiteMember.bind(this)) || [];
  }

  renderMember(member) {
    if (!member) {
      return null;
    }

    return (
      <li
        key={member.siteMemberId}
        className={styles.avatar}
        style={{ backgroundImage: `url('${member.imageUrl}')` }}
      />
    );
  }

  render() {
    const { option, t, showResults, showVotes, rce } = this.props;

    if (!rce.isViewMode) {
      return null;
    }

    if (!showResults || !showVotes) {
      return null;
    }

    return (
      <div className={styles.container}>
        <ul className={styles.avatar_list}>{this.getSiteMembers().map(this.renderMember)}</ul>
        <span>{t('Poll_Viewer_VoteCount', { number: option.count || 0 })}</span>
      </div>
    );
  }
}

export const VotedUsers = withRCEHelpers(VotedUsersComponent);

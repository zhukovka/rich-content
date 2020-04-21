/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PureComponent } from 'react';
import ReactModal from 'react-modal';
import classnames from 'classnames';

import { withRCEHelpers } from '../rce-helpers-context';

import { VotedUsersProps } from './types';
import { VotedUsersModal } from './VotedUsersModal';

import styles from './voted-users.scss';

class VotedUsersComponent extends PureComponent {
  static propTypes = {
    ...VotedUsersProps,
  };

  state = {
    isOpen: false,
    $container: null,
  };

  getContainer = () => this.state.$container;

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

  closeModal = () => this.setState({ isOpen: false });

  openModal = () => this.setState({ isOpen: this.props.rce.isViewMode });

  render() {
    const { option, t, showResults, showVotes, rce, fetchVoters } = this.props;
    const { isOpen, $container } = this.state;

    if (!rce.isViewMode) {
      return null;
    }

    if (!showResults || !showVotes) {
      return null;
    }

    return (
      <>
        <div
          className={classnames(styles.container, {
            [styles.cta]: option.count,
          })}
          ref={$container => this.setState({ $container })}
          onClick={this.openModal}
        >
          <ul className={styles.avatar_list}>{this.getSiteMembers().map(this.renderMember)}</ul>
          <span>{t('Poll_Viewer_VoteCount', { number: option.count || 0 })}</span>
        </div>

        {$container && option.count ? (
          <ReactModal
            isOpen={isOpen}
            onRequestClose={this.closeModal}
            parentSelector={this.getContainer}
            className={classnames(styles.modal)}
            overlayClassName={classnames(styles.overlay)}
          >
            <VotedUsersModal
              option={option}
              fetchVoters={fetchVoters}
              getSiteMember={this.getSiteMember.bind(this)}
              onRequestClose={this.closeModal}
            />
          </ReactModal>
        ) : null}
      </>
    );
  }
}

export const VotedUsers = withRCEHelpers(VotedUsersComponent);

import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import { LoaderIcon, RemoveIcon } from '../../assets/icons';
import { withRCEHelpers, RCEHelpersPropTypes } from '../rce-helpers-context';

import styles from './voted-users.scss';

export class VotedUsersModalComponent extends Component {
  static propTypes = {
    ...RCEHelpersPropTypes,
  };

  state = {
    members: [],
    moreItems: true,
    cursor: undefined,
  };

  fetchVoters = async () => {
    const { getSiteMember } = this.props;
    const { members, cursor } = this.state;

    try {
      const { voters, moreItems } = await this.props.fetchVoters({ cursor, limit: 10 });

      this.setState({
        members: members.concat(voters.map(member => member.memberId).map(getSiteMember)),
        cursor: voters[voters.length - 1].memberId,
        moreItems,
      });
    } catch (error) {}
  };

  render() {
    const { t, option, onRequestClose } = this.props;
    const { members, moreItems } = this.state;

    return (
      <>
        <div className={styles.header}>
          <p className={styles.title}>
            {t('Poll_Viewer_VoteCount_Modal_Voters_Header', { number: option.count })}
          </p>
          <RemoveIcon onClick={onRequestClose} className={styles.close_icon} />
        </div>
        <InfiniteScroll
          className={styles.member_list_container}
          initialLoad
          hasMore={moreItems}
          loadMore={this.fetchVoters}
          loader={
            <div className={styles.loader}>
              <LoaderIcon width={24} height={24} className={styles.spinner} />
            </div>
          }
        >
          <ul className={styles.member_list}>
            {members.map(member =>
              member ? (
                <li key={member.siteMemberId}>
                  <div className={styles.user_card}>
                    <span
                      className={styles.user_avatar}
                      style={{ backgroundImage: `url(${member.imageUrl})` }}
                    />
                    <span className={styles.user_name}>{member.name?.nick}</span>
                  </div>
                </li>
              ) : (
                <span className={styles.user_name}>Error retrieving siteMembers</span>
              )
            )}
          </ul>
        </InfiniteScroll>
        {option.anonymousCount ? (
          <p className={styles.anonymous_counter}>
            {t('Poll_Viewer_VoteCount_Modal_Voters_Anonymous', {
              anonNumber: option.anonymousCount,
            })}
          </p>
        ) : null}
      </>
    );
  }
}

export const VotedUsersModal = withRCEHelpers(VotedUsersModalComponent);

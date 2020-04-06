import React, { Component } from 'react';
import cls from 'classnames';
import FlipMove from 'react-flip-move';

import { AddIcon } from '../assets/icons';
import { LAYOUT, VISIBILITY, BACKGROUND_TYPE } from '../constants';

import { withPoll, PollContextPropTypes } from './poll-context';
import { withRCEHelpers, RCEHelpersPropTypes } from './rce-helpers-context';
import { PollHeader } from './poll-header';
import { VotedUsers } from './voted-users';
import { PollOption } from './poll-option';

import styles from './poll.scss';

class PollComponent extends Component {
  static propTypes = {
    ...PollContextPropTypes,
    ...RCEHelpersPropTypes,
  };

  handleOptionUpdate(index) {
    return option => this.props.updatePollOption(index, option);
  }

  handleOptionRemove(index) {
    return () => this.props.removeOption(index);
  }

  showResults() {
    const { resultsVisibility } = this.props.poll.settings;

    switch (resultsVisibility) {
      case VISIBILITY.ALWAYS:
        return true;

      case VISIBILITY.VOTERS:
        return !!this.props.poll.ownVotes?.length;

      case VISIBILITY.ME:
        return this.props.poll.creatorFlag;

      default:
        return false;
    }
  }

  hasImageBackground() {
    return this.props.design.poll?.backgroundType === BACKGROUND_TYPE.IMAGE;
  }

  getOptionList() {
    const { poll, rce } = this.props;

    if (!rce.isViewMode || !this.showResults()) {
      return poll.options;
    }

    return poll.options.sort((prev, option) => {
      if (option.count === prev.count) {
        return 0;
      }

      if (option.count > prev.count) {
        return 1;
      }

      return -1;
    });
  }

  render() {
    const { poll, rce, addOption, design, layout, vote, unvote, t, siteMembers } = this.props;

    return (
      <div
        className={cls(styles.container, {
          [styles.isMobile]: rce.isMobile,
        })}
      >
        <div
          className={cls(styles.background_overlay, {
            [styles.with_image]: this.hasImageBackground(),
          })}
          style={design.poll}
        />
        <PollHeader />

        <ul
          className={cls(styles.options, {
            [styles.list]: layout.poll?.type === LAYOUT.LIST,
            [styles.grid]: layout.poll?.type === LAYOUT.GRID,
            [styles.with_image]: layout.option?.enableImage,
          })}
        >
          <FlipMove typeName={null} disableAllAnimations={!rce.isViewMode}>
            {this.getOptionList().map((option, i) => (
              <li className={styles.option} key={rce.isViewMode ? option.id : option.localId || i}>
                <PollOption
                  option={option}
                  update={this.handleOptionUpdate(option.localId)}
                  remove={this.handleOptionRemove(option.localId)}
                  removeEnabled={!rce.isViewMode && poll.options.length > 1}
                  vote={vote}
                  unvote={unvote}
                  poll={poll}
                  showResults={this.showResults()}
                />
                <VotedUsers
                  option={option}
                  siteMembers={siteMembers}
                  showResults={this.showResults()}
                  showVoters={poll.settings.votersDisplay}
                  showVotes={poll.settings.votesDisplay}
                />
              </li>
            ))}
          </FlipMove>

          {!rce.isViewMode && (
            <li className={styles.column}>
              <button onClick={addOption} className={styles.add_option} style={design.option}>
                {layout.poll?.type === LAYOUT.GRID && layout.option?.enableImage ? (
                  <AddIcon />
                ) : (
                  t('Poll_Editor_Answer_AddAnswer')
                )}
              </button>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export const Poll = withRCEHelpers(withPoll(PollComponent));

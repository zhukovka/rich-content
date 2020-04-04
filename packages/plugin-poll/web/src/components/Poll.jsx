import React, { Component } from 'react';
import cls from 'classnames';
import FlipMove from 'react-flip-move';

import { AddIcon } from '../assets/icons';
import { LAYOUT } from '../constants';

import { withPoll, PollContextPropTypes } from './poll-context';
import { withRCEHelpers, RCEHelpersPropTypes } from './rce-helpers-context';
import { PollHeader } from './poll-header';
import { VotedUsers } from './voted-users';
import { PollOption } from './option';

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
    return !!this.props.poll.ownVotes.length;
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
    const style = {
      ...design.poll,
    };

    return (
      <div
        className={cls(styles.container, {
          [styles.isMobile]: rce.isMobile,
        })}
        style={style}
      >
        <PollHeader />

        <ul
          className={cls(styles.options, {
            [styles.list]: layout.poll?.type === LAYOUT.LIST,
            [styles.grid]: layout.poll?.type === LAYOUT.GRID,
            [styles.withImage]: layout.option?.enableImage,
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
                />
              </li>
            ))}
          </FlipMove>

          {!rce.isViewMode && (
            <li>
              <button onClick={addOption} className={styles.addOptionButton} style={design.option}>
                {layout.poll?.type === LAYOUT.GRID ? (
                  <AddIcon />
                ) : (
                  t('Poll_Editor_Option_AddOption')
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

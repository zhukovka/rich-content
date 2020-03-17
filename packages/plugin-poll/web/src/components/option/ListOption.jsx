/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { PureComponent } from 'react';
import cls from 'classnames';

import { RemoveIcon, CheckIcon } from '../../assets/icons';
import { TextField } from '../text-field';

import { OptionPropTypes } from './types';

import styles from './option.scss';

export class ListOption extends PureComponent {
  static propTypes = OptionPropTypes;

  handleTitleChange = title => {
    const { update, option } = this.props;

    update({ ...option, title });
  };

  userVoted() {
    return !!this.props.poll.chosen.length;
  }

  isUserChoice() {
    const { poll, option } = this.props;

    return !!poll.chosen.includes(option.id);
  }

  handleRemove = e => {
    e.stopPropagation();

    this.props.remove();
  };

  handleClick = () => {
    if (this.isUserChoice()) {
      this.props.unvote(this.props.option.id);
    } else {
      this.props.vote(this.props.option.id);
    }
  };

  render() {
    const { option, removeEnabled, isViewMode, poll } = this.props;

    if (isViewMode) {
      return (
        <div className={styles.option}>
          <div className={styles.title}>
            <p
              className={cls(styles.input, {
                [styles.cta]: isViewMode,
                [styles.showResults]: this.userVoted(),
                [styles.userChoice]: this.isUserChoice(),
              })}
              onClick={this.handleClick}
            >
              <span
                className={styles.progress}
                style={{ width: `${(option.count / poll.total) * 100}%` }}
              />
              {this.isUserChoice() && <CheckIcon className={styles.votedIcon} />}
              <span className={styles.label}>{option.title}</span>
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.option}>
        <div className={styles.title}>
          <TextField
            className={styles.input}
            value={option.title}
            placeholder="Type an answer here"
            onChange={this.handleTitleChange}
          />
          {removeEnabled && <RemoveIcon onClick={this.handleRemove} className={styles.remove} />}
        </div>
      </div>
    );
  }
}

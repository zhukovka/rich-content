/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { PureComponent } from 'react';
import cls from 'classnames';
import { withRCEHelpers, RCEHelpersPropTypes } from '../rce-helpers-context';

import { RemoveIcon, CheckIcon } from '../../assets/icons';
import { TextField } from '../text-field';
import { ImageUpload } from '../image-upload';

import { OptionPropTypes } from './types';

import styles from './option.scss';

class PollOptionComponent extends PureComponent {
  static propTypes = {
    ...OptionPropTypes,
    ...RCEHelpersPropTypes,
  };

  handleTitleChange = title => {
    const { update, option } = this.props;

    return update({ ...option, title });
  };

  handleImageChange = imageUrl => {
    const { update, option } = this.props;

    return update({ ...option, imageUrl });
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
    const { option, removeEnabled, isViewMode, imageEnabled, poll, t } = this.props;

    if (isViewMode) {
      return (
        <div
          className={cls(styles.option, {
            [styles.withImage]: imageEnabled && option.imageUrl,
            [styles.userChoice]: this.isUserChoice(),
          })}
        >
          {imageEnabled && <ImageUpload className={styles.image} value={option.imageUrl} />}
          <div className={styles.title}>
            <p
              className={cls(styles.input, {
                [styles.cta]: isViewMode,
                [styles.showResults]: this.userVoted(),
                [styles.centered]: imageEnabled,
              })}
              onClick={this.handleClick}
            >
              <span
                className={styles.progress}
                style={{ width: `${(option.count / poll.total) * 100}%` }}
              />
              <span className={styles.label}>{option.title}</span>
            </p>
          </div>
          <div className={styles.check}>
            <CheckIcon className={styles.icon} />
          </div>
        </div>
      );
    }

    return (
      <div
        className={cls(styles.option, {
          [styles.withImage]: imageEnabled,
        })}
      >
        {imageEnabled && (
          <ImageUpload
            className={styles.image}
            value={option.imageUrl}
            onChange={this.handleImageChange}
          />
        )}
        <div className={styles.title}>
          <TextField
            className={styles.input}
            value={option.title}
            placeholder={t('Poll_Editor_Option_Placeholder')}
            onChange={this.handleTitleChange}
            endAdornment={
              removeEnabled && <RemoveIcon onClick={this.handleRemove} className={styles.remove} />
            }
          />
        </div>
      </div>
    );
  }
}

export const PollOption = withRCEHelpers(PollOptionComponent);

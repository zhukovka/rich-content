/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { PureComponent } from 'react';
import cls from 'classnames';

import { withRCEHelpers, RCEHelpersPropTypes } from '../rce-helpers-context';

import { RemoveIcon, CheckIcon, LoaderIcon } from '../../assets/icons';
import { TextField } from '../text-field';
import { ImageUpload } from '../image-upload';
import { OPTION_IMAGES_POOL } from '../../constants';

import { OptionPropTypes } from './types';

import styles from './option.scss';

class PollOptionComponent extends PureComponent {
  static propTypes = {
    ...OptionPropTypes,
    ...RCEHelpersPropTypes,
  };

  state = {
    loading: false,
  };

  handleTitleChange = title => {
    const { update, option } = this.props;

    return update({ ...option, title });
  };

  handleImageChange = mediaId => {
    const { update, option } = this.props;

    return update({ ...option, mediaId });
  };

  isUserChoice() {
    const { poll, option } = this.props;

    return !!poll.ownVotes.includes(option.id);
  }

  handleRemove = e => {
    e.stopPropagation();

    this.props.remove();
  };

  handleClick = async () => {
    this.setState({ loading: true });

    try {
      if (this.isUserChoice()) {
        await this.props.unvote(this.props.option.id);
      } else {
        await this.props.vote(this.props.option.id);
      }
    } catch (error) {
    } finally {
      this.setState({ loading: false });
    }
  };

  getVotePercentage() {
    const { option, poll, showResults } = this.props;

    if (!showResults) {
      return 0;
    }

    return (option.count / poll.count) * 100;
  }

  render() {
    const { rce, layout, design, option, removeEnabled, showResults, t } = this.props;
    const { loading } = this.state;

    const imageEnabled = layout.option?.enableImage;

    const borderRadius = parseInt(design.option?.borderRadius);

    const style = {
      input: {
        borderRadius: imageEnabled
          ? `0 0 ${borderRadius}px ${borderRadius}px`
          : `${borderRadius}px`,
      },
      image: {
        borderRadius: `${borderRadius}px ${borderRadius}px 0 0`,
      },
    };

    if (rce.isViewMode) {
      return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
          className={cls(styles.option, {
            [styles.cta]: rce.isViewMode,
            [styles.withImage]: imageEnabled && option.mediaId,
            [styles.userChoice]: this.isUserChoice(),
          })}
          style={design.option}
          onClick={this.handleClick}
        >
          <div
            className={cls(styles.overlay, {
              [styles.shown]: loading,
            })}
            style={design.option}
          >
            <LoaderIcon className={styles.spinner} width={36} height={36} />
          </div>
          {imageEnabled && option.mediaId && (
            <ImageUpload className={styles.image} value={option.mediaId} style={style.image} />
          )}
          <div className={styles.title}>
            <p
              className={cls(styles.input, {
                [styles.centered]: imageEnabled,
                [styles.with_result]: showResults,
              })}
              style={style.input}
            >
              <span
                className={styles.progress}
                style={{
                  width: `${this.getVotePercentage()}%`,
                  ...style.input,
                }}
              />
              <span className={styles.label}>{option.title || ' '}</span>
              {showResults && (
                <span className={styles.progress_value}>{this.getVotePercentage().toFixed()}%</span>
              )}
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
        style={design.option}
      >
        {imageEnabled && (
          <ImageUpload
            className={styles.image}
            value={option.mediaId}
            onChange={this.handleImageChange}
            style={style.image}
            imagesPool={OPTION_IMAGES_POOL}
          />
        )}
        <div className={styles.title}>
          <TextField
            style={style.input}
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

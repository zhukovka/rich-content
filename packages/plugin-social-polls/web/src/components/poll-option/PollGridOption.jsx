/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import cls from 'classnames';

import { RemoveIcon, CheckIcon, LoaderIcon } from '../../assets/icons';
import { OPTION_IMAGES_POOL } from '../../constants';
import { TextField } from '../text-field';
import { ImageUpload } from '../image-upload';

import { PollOptionBase } from './PollOptionBase';

import styles from './option.scss';

export class PollGridOption extends PollOptionBase {
  static propTypes = PollOptionBase.propTypes;

  getCustomStyle() {
    const { design } = this.props;

    const borderRadius = parseInt(design.option?.borderRadius);

    return {
      input: {
        borderRadius: this.isImageEnabled()
          ? `0 0 ${borderRadius}px ${borderRadius}px`
          : `${borderRadius}px`,
      },
      image: {
        borderRadius: `${borderRadius}px ${borderRadius}px 0 0`,
      },
    };
  }

  renderEditMode() {
    const { design, option, removeEnabled, t } = this.props;

    const style = this.getCustomStyle();

    return (
      <div
        className={cls(styles.option, {
          [styles.withImage]: this.isImageEnabled(),
        })}
        style={design.option}
      >
        {this.isImageEnabled() && (
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
            maxLength={60}
            style={style.input}
            className={cls(styles.input, styles.centered)}
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

  renderViewMode() {
    const { design, option, showResults } = this.props;
    const { loading } = this.state;

    const style = this.getCustomStyle();

    return (
      <div
        className={cls(styles.option, styles.grid, styles.cta, {
          [styles.withImage]: this.isImageEnabled(),
          [styles.user_choice]: this.isUserChoice(),
        })}
        style={design.option}
        onClick={this.handleVoteClick}
      >
        <div
          className={cls(styles.overlay, {
            [styles.shown]: loading,
          })}
          style={design.option}
        >
          <LoaderIcon className={styles.spinner} width={36} height={36} />
        </div>
        {this.isImageEnabled() && (
          <ImageUpload className={styles.image} value={option.mediaId} style={style.image} />
        )}
        <div className={styles.title}>
          <TextField
            maxLength={60}
            style={style.input}
            className={cls(styles.input, styles.centered, {
              [styles.with_result]: showResults,
            })}
            value={option.title}
          >
            <span
              className={styles.progress}
              style={{
                width: `${this.getVotePercentage()}%`,
                ...style.input,
              }}
            />
            {showResults && (
              <span className={styles.progress_value}>{this.getVotePercentage().toFixed()}%</span>
            )}
          </TextField>
        </div>
        <div className={styles.check}>
          <CheckIcon className={styles.icon} />
        </div>
      </div>
    );
  }
}

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import cls from 'classnames';

import { RemoveIcon, CheckIcon, LoaderIcon } from '../../assets/icons';
import { TextField } from '../text-field';
import { ImageUpload } from '../image-upload';
import { OPTION_IMAGES_POOL } from '../../constants';

import { PollOptionBase } from './PollOptionBase';

import styles from './option.scss';

export class PollListOption extends PollOptionBase {
  static propTypes = PollOptionBase.propTypes;

  getCustomStyle() {
    const { design } = this.props;

    const borderRadius = parseInt(design.option?.borderRadius);

    return {
      input: {
        borderRadius: `${borderRadius}px`,
      },
      image: {
        borderRadius: `${borderRadius}px`,
      },
    };
  }

  renderViewMode() {
    const { design, option, showResults, dark } = this.props;
    const { loading } = this.state;

    const style = this.getCustomStyle();

    return (
      <div
        className={cls(styles.option, styles.list, styles.cta, {
          [styles.with_image]: this.isImageEnabled() && option.mediaId,
          [styles.user_choice]: this.isUserChoice(),
          [styles.dark]: dark,
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
        <div className={styles.title}>
          <TextField
            maxLength={60}
            style={style.input}
            className={cls(styles.input, {
              [styles.with_result]: showResults,
            })}
            value={option.title}
            startAdornment={
              this.isImageEnabled() && (
                <ImageUpload
                  className={styles.image}
                  value={option.mediaId}
                  style={style.image}
                  small
                />
              )
            }
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

  renderEditMode() {
    const { design, option, removeEnabled, t, dark } = this.props;

    const style = this.getCustomStyle();

    return (
      <div
        className={cls(styles.option, styles.list, {
          [styles.with_image]: this.isImageEnabled(),
          [styles.dark]: dark,
        })}
        style={design.option}
      >
        <div className={styles.title}>
          <TextField
            maxLength={60}
            style={style.input}
            className={styles.input}
            value={option.title}
            placeholder={t('Poll_Editor_Answer_Placeholder')}
            onChange={this.handleTitleChange}
            endAdornment={
              removeEnabled && <RemoveIcon onClick={this.handleRemove} className={styles.remove} />
            }
            startAdornment={
              this.isImageEnabled() && (
                <ImageUpload
                  className={styles.image}
                  value={option.mediaId}
                  onChange={this.handleImageChange}
                  style={style.image}
                  imagesPool={OPTION_IMAGES_POOL}
                  small
                />
              )
            }
          />
        </div>
      </div>
    );
  }
}

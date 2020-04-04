import React, { PureComponent } from 'react';

import { TextField } from '../text-field';
import { withPoll, PollContextPropTypes } from '../poll-context';
import { withRCEHelpers, RCEHelpersPropTypes } from '../rce-helpers-context';
import { ImageUpload } from '../image-upload';
import { POLL_IMAGES_POOL } from '../../constants';

import styles from './poll-header.scss';

class PollHeaderComponent extends PureComponent {
  render() {
    const { poll, changePollTitle, changePollImage, layout, t } = this.props;

    return (
      <div className={styles.header}>
        <TextField
          maxLength={65}
          textAutoResize
          className={styles.title}
          value={poll.title}
          onChange={changePollTitle}
          placeholder={t('Poll_Editor_Question_Placeholder')}
        />
        {layout.poll?.enableImage && (
          <ImageUpload
            className={styles.image}
            value={poll.mediaId}
            onChange={changePollImage}
            imagesPool={POLL_IMAGES_POOL}
          />
        )}
      </div>
    );
  }
}

export const PollHeader = withRCEHelpers(withPoll(PollHeaderComponent));

PollHeaderComponent.propTypes = {
  ...PollContextPropTypes,
  ...RCEHelpersPropTypes,
};

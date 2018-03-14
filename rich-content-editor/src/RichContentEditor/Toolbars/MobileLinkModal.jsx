import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LinkIcon from './icons/link.svg';
import styles from '~/Styles/mobile-link-modal.scss';
import LinkPanelContainer from '~/Components/LinkPanelContainer';


export default class MobileLinkModal extends Component {
  render() {
    const { url, targetBlank, nofollow, theme, isMobile, isActive, onDone, onCancel, onDelete, t } = this.props;
    const mobileLinkModalTitle = t('MobileLinkModal_Title');
    return (
      <div>
        <div className={styles.mobileLinkModal_titleContainer}>
          <div className={styles.mobileLinkModal_linkIconContainer} >
            <LinkIcon />
          </div>
          <h3 className={styles.mobileLinkModal_title}>{mobileLinkModalTitle}</h3>
        </div>
        <LinkPanelContainer
          url={url}
          targetBlank={targetBlank}
          nofollow={nofollow}
          theme={theme}
          isActive={isActive}
          isMobile={isMobile}
          onDone={onDone}
          onCancel={onCancel}
          onDelete={onDelete}
          t={t}
        />
      </div>
    );
  }
}

MobileLinkModal.propTypes = {
  theme: PropTypes.object.isRequired,
  onDone: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
  isMobile: PropTypes.bool,
  url: PropTypes.string,
  targetBlank: PropTypes.bool,
  nofollow: PropTypes.bool,
  t: PropTypes.func,
};

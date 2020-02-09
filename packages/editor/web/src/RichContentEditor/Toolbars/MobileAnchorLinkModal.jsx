import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AnchorPanelContainer } from 'wix-rich-content-editor-common';
import { AnchorIcon } from '../Icons';
import styles from '../../../statics/styles/mobile-link-modal.scss';

export default class MobileAnchorLinkModal extends Component {
  render() {
    const {
      name,
      targetBlank,
      anchorTarget,
      relValue,
      nofollow,
      theme,
      isMobile,
      isActive,
      onDone,
      onCancel,
      t,
      uiSettings,
      anchorsEntities,
    } = this.props;
    const mobileAnchorModalTitle = t('MobileAnchorModal_Title');
    return (
      <div>
        <div className={styles.mobileLinkModal_titleContainer}>
          <div className={styles.mobileLinkModal_linkIconContainer}>
            <AnchorIcon />
          </div>
          <h3 id="mob_anchor_modal_hdr" className={styles.mobileLinkModal_title}>
            {mobileAnchorModalTitle}
          </h3>
        </div>
        <AnchorPanelContainer
          anchorsEntities={anchorsEntities}
          name={name}
          targetBlank={targetBlank}
          anchorTarget={anchorTarget}
          relValue={relValue}
          nofollow={nofollow}
          theme={theme}
          isActive={isActive}
          isMobile={isMobile}
          onDone={onDone}
          onCancel={onCancel}
          t={t}
          ariaProps={{ 'aria-labelledby': 'mob_anchor_modal_hdr' }}
          uiSettings={uiSettings}
        />
      </div>
    );
  }
}

MobileAnchorLinkModal.propTypes = {
  anchorsEntities: PropTypes.array.isRequired,
  theme: PropTypes.object.isRequired,
  onDone: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
  isMobile: PropTypes.bool,
  name: PropTypes.string,
  targetBlank: PropTypes.bool,
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
  nofollow: PropTypes.bool,
  t: PropTypes.func,
  uiSettings: PropTypes.object,
};

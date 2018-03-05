import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import LinkIcon from './icons/link.svg';
import styles from '~/Styles/mobile-link-modal.scss';
import LinkPanelContainer from '~/Components/LinkPanelContainer';


export default class MobileLinkModal extends Component {
  hidePopup = () => this.props.hidePopup();

  wrapBlockInLink = ({ url, targetBlank, nofollow }) => {
    const { pubsub } = this.props;
    if (!isEmpty(url)) {
      pubsub.set('componentLink', { url, targetBlank, nofollow });
    } else {
      pubsub.set('componentLink', null);
    }
    this.hidePopup();
  };

  deleteLink = () => {
    this.props.pubsub.set('componentLink', null);
  }

  render() {
    const { pubsub, theme, isMobile } = this.props;
    const componentLink = pubsub.get('componentLink');
    const { url, targetBlank, nofollow } = componentLink || {};
    return (
      <div>
        <div className={styles.mobileLinkModal_titleContainer}>
          <div className={styles.mobileLinkModal_linkIconContainer} >
            <LinkIcon />
          </div>
          <h3 className={styles.mobileLinkModal_title}>Add a link</h3>
        </div>
        <LinkPanelContainer
          url={url}
          targetBlank={targetBlank}
          nofollow={nofollow}
          theme={theme}
          isActive={!!componentLink}
          isMobile={isMobile}
          onDone={this.wrapBlockInLink}
          onCancel={this.hidePopup}
          onDelete={this.deleteLink}
        />
      </div>
    );
  }
}

MobileLinkModal.propTypes = {
  pubsub: PropTypes.object.isRequired,
  hidePopup: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  url: PropTypes.string,
  isMobile: PropTypes.bool,
  targetBlank: PropTypes.bool,
  nofollow: PropTypes.bool,
};

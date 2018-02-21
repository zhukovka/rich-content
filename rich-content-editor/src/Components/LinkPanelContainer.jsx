import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import LinkPanel from './LinkPanel';

import { mergeStyles } from '~/Utils';
import styles from '~/Styles/link-panel.scss';
import RadioGroupHorizontal from './RadioGroupHorizontal';

const LinkType = props => (
  <RadioGroupHorizontal
    dataSource={[{ value: 'url', labelText: 'Website address (URL)' }, { value: 'page', labelText: 'Site Page' }]}
    {...props}
  />
);

LinkType.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

class LinkPanelContainer extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  setLinkPanel = linkPanel => this.linkPanel = linkPanel;

  onDoneClick = () => {
    if (this.linkPanel.state.isValidUrl && this.linkPanel.state.url) {
      const { url, targetBlank, nofollow } = this.linkPanel.state;
      this.props.onDone && this.props.onDone({ url, targetBlank, nofollow });
    } else {
      this.linkPanel.validateUrl();
    }
  };

  onCancelClick = () => this.props.onCancel && this.props.onCancel();

  onDeleteClick = () => {
    const { onCancel, onDelete } = this.props;
    onDelete();
    onCancel();
  }

  render() {
    const { styles } = this;
    const { url, targetBlank, nofollow, theme, isActive } = this.props;
    const doneButtonClassName = classNames(styles.linkPanel_FooterButton, styles.linkPanel_enabled);
    const cancelButtonClassName = classNames(styles.linkPanel_FooterButton, styles.linkPanel_Cancel);
    return (
      <div className={styles.linkPanel_modal}>
        <div className={styles.linkPanel_content}>
          <LinkPanel
            ref={this.setLinkPanel}
            theme={theme}
            url={url}
            targetBlank={targetBlank}
            nofollow={nofollow}
          />
          <div className={styles.linkPanel_actionsDivider} />
        </div>
        <div className={styles.linkPanel_Footer}>
          <div className={styles.linkPanel_LeftActions}>
            <div className={cancelButtonClassName} onClick={this.onCancelClick}>Cancel</div>
            {isActive &&
            <div className={styles.linkPanel_RemoveContainer}>
              <div className={styles.linkPanel_VerticalDivider} />
              <div className={styles.linkPanel_FooterButton} onClick={this.onDeleteClick}>Remove Link</div>
            </div>
            }
          </div>
          <div className={doneButtonClassName} onClick={this.onDoneClick}>Update</div>
        </div>
      </div>
    );
  }
}

LinkPanelContainer.propTypes = {
  onDone: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  url: PropTypes.string,
  isActive: PropTypes.bool,
  targetBlank: PropTypes.bool,
  nofollow: PropTypes.bool,
  onOverrideContent: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};

export default LinkPanelContainer;

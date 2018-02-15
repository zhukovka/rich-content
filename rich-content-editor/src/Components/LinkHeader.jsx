import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BackArrow from './icons/back-arrow.svg';
import Trash from './icons/trash.svg';

import { mergeStyles } from '~/Utils';
import styles from '~/Styles/link-panel.scss';

export default class LinkHeader extends Component {

  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  handleDelete = () => {
    const { onBack, onDelete } = this.props;
    onDelete();
    onBack();
  }

  render() {
    const { styles } = this;
    const { isActive, onBack } = this.props;
    return (
      <div className={styles.linkPanel_linkHeaderContainer}>
        <div className={styles.linkPanel_linkHeaderBackArrowContainer} onClick={onBack} >
          <BackArrow className={styles.linkPanel_linkHeaderBackIcon} />
        </div>
        <div className={styles.linkPanel_linkHeaderDivider}/>
        <div className={styles.linkPanel_linkHeaderText}>Add a Link</div>
        {isActive &&
        <div className={styles.linkPanel_linkHeaderDelete}>
          <div className={styles.linkPanel_linkHeaderDivider}/>
          <div className={styles.linkPanel_linkHeaderTrashContainer} onClick={this.handleDelete} >
            <Trash className={styles.linkPanel_linkHeaderTrashIcon} />
          </div>
        </div>
        }
      </div>
    );
  }
}

LinkHeader.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onBack: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};


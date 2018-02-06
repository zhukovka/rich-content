import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '../Components/ThemeProvider';
import BackArrow from './icons/back-arrow.svg';
import Trash from './icons/trash.svg';
import Styles from '~/Styles/link-panel.scss';

export default class LinkHeader extends Component {

  handleDelete = () => {
    const { onBack, onDelete } = this.props;
    onDelete();
    onBack();
  }

  render() {
    const { isActive, onBack } = this.props;
    return (
      <ThemeProvider theme={'rce'}>
        <div className={Styles.linkHeaderContainer}>
          <div className={Styles.linkHeaderBackArrowContainer} onClick={onBack} >
            <BackArrow className={Styles.linkHeaderBackIcon} />
          </div>
          <div className={Styles.linkHeaderDivider}/>
          <div className={Styles.linkHeaderText}>Add a Link</div>
          {isActive &&
            <div className={Styles.linkHeaderDelete}>
              <div className={Styles.linkHeaderDivider}/>
              <div className={Styles.linkHeaderTrashContainer} onClick={this.handleDelete} >
                <Trash className={Styles.linkHeaderTrashIcon} />
              </div>
            </div>
          }
        </div>
      </ThemeProvider>
    );
  }
}

LinkHeader.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onBack: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};


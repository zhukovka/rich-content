import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '../Components/ThemeProvider';
import BackArrow from './icons/back-arrow.svg';
import Divider from './icons/divider.svg';
import Trash from './icons/trash.svg';
import Styles from '~/Styles/link-panel.scss';

export default class LinkHeader extends Component {
  render() {
    return (
      <ThemeProvider theme={'rce'}>
        <div className={Styles.linkHeaderContainer}>
          <div className={Styles.linkHeaderBackArrowContainer} onClick={this.props.onBack} >
            <BackArrow className={Styles.linkHeaderBackIcon} />
          </div>
          <Divider className={Styles.linkHeaderDivider}/>
          <div className={Styles.linkHeaderText}>Add a Link</div>
          <Divider className={Styles.linkHeaderDivider}/>
          <div className={Styles.linkHeaderTrashContainer} onClick={this.props.onBack} >
            <Trash className={Styles.linkHeaderTrashIcon} />
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

LinkHeader.propTypes = {
  onBack: PropTypes.func.isRequired,
};


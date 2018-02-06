import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '../Components/ThemeProvider';
import BackArrow from './icons/back-arrow.svg';
import Divider from './icons/divider.svg';
import Styles from '~/Styles/link-panel.scss';

export default class LinkHeader extends Component {
  render() {
    return (
      <ThemeProvider theme={'rce'}>
        <div onClick={this.props.onBack} className={Styles.linkHeaderContainer}>
          <BackArrow className={Styles.linkHeaderBackIcon} />
          <Divider className={Styles.linkHeaderSeperator}/>
          <div className={Styles.linkHeaderText}>Add a Link</div>
        </div>
      </ThemeProvider>

    );
  }
}

LinkHeader.propTypes = {
  onBack: PropTypes.func.isRequired,
};


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BlockLinkButton from './BlockLinkButton';
import BlockAnchorButton from './BlockAnchorButton';

export default class FloatingModalButton extends Component {
  render() {
    const { buttonKeyName } = this.props;
    switch (buttonKeyName) {
      case 'anchor':
        return <BlockAnchorButton {...this.props} />;
      case 'link':
        return <BlockLinkButton {...this.props} />;
      default:
        // eslint-disable-next-line no-console
        console.log('error!! invalid using of BUTTON.FLOATING_MODAL');
        return;
    }
  }
}

FloatingModalButton.propTypes = {
  buttonKeyName: PropTypes.string,
  pubsub: PropTypes.object.isRequired,
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  onExtendContent: PropTypes.func.isRequired,
  onOverrideContent: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  isMobile: PropTypes.bool,
  linkModal: PropTypes.bool,
  helpers: PropTypes.object,
  keyName: PropTypes.string,
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
  t: PropTypes.func,
  tabIndex: PropTypes.number,
  uiSettings: PropTypes.object,
  config: PropTypes.object,
  key: PropTypes.number,
  componentState: PropTypes.object,
  closeModal: PropTypes.func,
  icons: PropTypes.object,
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { getLinkDataInSelection, getEntityByType } from 'wix-rich-content-editor-common';
import MobileAnchorModal from './MobileAnchorModal';

export default class MobileTextAnchorModal extends Component {
  constructor(props) {
    super(props);
    const { getEditorState } = props;
    this.anchorsEntities = getEntityByType(getEditorState(), 'wix-draft-plugin-anchor');
  }

  hidePopup = () => this.props.hidePopup();

  updateAnchor = ({ name }) => {
    const { pubsub } = this.props;
    pubsub.update('componentData', { name });
    this.hidePopup();
  };

  render() {
    const { getEditorState, theme, isMobile, anchorTarget, relValue, t, uiSettings } = this.props;
    const anchorData = getLinkDataInSelection(getEditorState());
    const { name, target, rel } = anchorData || {};
    const targetBlank = target ? target === '_blank' : anchorTarget === '_blank';
    const nofollow = rel ? rel === 'nofollow' : relValue === 'nofollow';
    return (
      <MobileAnchorModal
        anchorsEntities={this.anchorsEntities}
        name={name}
        targetBlank={targetBlank}
        nofollow={nofollow}
        theme={theme}
        isActive={!isEmpty(anchorData)}
        isMobile={isMobile}
        anchorTarget={anchorTarget}
        relValue={relValue}
        onDone={this.updateAnchor}
        onCancel={this.hidePopup}
        uiSettings={uiSettings}
        t={t}
      />
    );
  }
}

MobileTextAnchorModal.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  hidePopup: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  url: PropTypes.string,
  isMobile: PropTypes.bool,
  targetBlank: PropTypes.bool,
  nofollow: PropTypes.bool,
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
  t: PropTypes.func,
  uiSettings: PropTypes.object,
  pubsub: PropTypes.object.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import {
  AnchorPanelContainer,
  getEntityByType,
  getLinkDataInSelection,
} from 'wix-rich-content-editor-common';

class AnchorModal extends React.Component {
  constructor(props) {
    super(props);
    const { getEditorState } = props;
    this.anchorsEntities = getEntityByType(getEditorState(), 'wix-draft-plugin-anchor');
    this.anchorData = getLinkDataInSelection(getEditorState());
  }

  updateAnchor = ({ name }) => {
    const { pubsub, helpers } = this.props;
    // const metadata = this.state.metadata || {};
    pubsub.update('componentData', { name });
    helpers.closeModal();
  };

  render() {
    const { theme, anchorTarget, relValue, t, onOverrideContent, uiSettings, helpers } = this.props;
    return (
      <AnchorPanelContainer
        anchorsEntities={this.anchorsEntities}
        name={this.anchorData.name}
        targetBlank={'_self'}
        theme={theme}
        anchorTarget={anchorTarget}
        relValue={relValue}
        t={t}
        isActive
        onDone={this.updateAnchor}
        onCancel={() => helpers.closeModal()}
        onDelete={null}
        onOverrideContent={onOverrideContent}
        uiSettings={uiSettings}
      />
    );
  }
}

AnchorModal.propTypes = {
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
  pubsub: PropTypes.object,
};

export default AnchorModal;

// import React from 'react';
// import PropTypes from 'prop-types';
// import {
//   getModalStyles,
//   EditorModals,
//   decorateComponentWithProps,
// } from 'wix-rich-content-editor-common';
// import AnchorLinkPanel from './AnchorLinkPanel';

// class AnchorModal extends React.Component {
//   render() {
//     const {
//       onExtendContent,
//       onOverrideContent,
//       getEditorState,
//       setEditorState,
//       theme,
//       isMobile,
//       linkModal,
//       helpers,
//       keyName,
//       anchorTarget,
//       relValue,
//       t,
//       uiSettings,
//     } = this.props;
//     const modalStyles = getModalStyles({ fullScreen: false, isMobile });
//     if (isMobile || linkModal) {
//       if (helpers && helpers.openModal) {
//         const modalProps = {
//           helpers,
//           modalStyles,
//           isMobile,
//           getEditorState,
//           setEditorState,
//           t,
//           theme,
//           anchorTarget,
//           relValue,
//           modalName: EditorModals.MOBILE_TEXT_ANCHOR_MODAL,
//           hidePopup: helpers.closeModal,
//           uiSettings,
//         };
//         return helpers.openModal(modalProps);
//       } else {
//         //eslint-disable-next-line no-console
//         console.error(
//           'Open external helper function is not defined for toolbar button with keyName ' + keyName
//         );
//       }
//     } else {
//       const anchorPanelProps = {
//         onExtendContent,
//         onOverrideContent,
//         anchorTarget,
//         relValue,
//         theme,
//         t,
//         uiSettings,
//       };
//       const TextAnchorPanelWithProps = decorateComponentWithProps(
//         AnchorLinkPanel,
//         anchorPanelProps
//       );
//       return TextAnchorPanelWithProps;
//       // return onOverrideContent(TextAnchorPanelWithProps);
//     }
//   }
// }

// AnchorModal.propTypes = {
//   getEditorState: PropTypes.func.isRequired,
//   setEditorState: PropTypes.func.isRequired,
//   onExtendContent: PropTypes.func.isRequired,
//   onOverrideContent: PropTypes.func.isRequired,
//   theme: PropTypes.object.isRequired,
//   isMobile: PropTypes.bool,
//   linkModal: PropTypes.bool,
//   helpers: PropTypes.object,
//   keyName: PropTypes.string,
//   anchorTarget: PropTypes.string,
//   relValue: PropTypes.string,
//   t: PropTypes.func,
//   tabIndex: PropTypes.number,
//   uiSettings: PropTypes.object,
//   config: PropTypes.object,
// };

// export default AnchorModal;

import { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { getLinkDataInSelection, getEntityByType } from '../../Utils/draftUtils';
import AnchorPanelContainer from '../../Components/AnchorPanelContainer';
import decorateComponentWithProps from '../../Utils/decorateComponentWithProps';

export default class AnchorLinkPanel extends Component {
  componentDidMount() {
    const { anchorTarget, relValue, getEditorState, theme, t, uiSettings } = this.props;
    const anchorData = getLinkDataInSelection(getEditorState());
    const { name, target } = anchorData || {};
    const anchorsEntities = getEntityByType(getEditorState(), 'wix-draft-plugin-anchor');
    const targetBlank = target ? target === '_blank' : anchorTarget === '_blank';
    const anchorContainerProps = {
      anchorsEntities,
      name,
      targetBlank,
      theme,
      anchorTarget,
      relValue,
      t,
      isActive: !isEmpty(anchorData) && !isEmpty(anchorData.name),
      onDone: this.updateAnchor,
      onCancel: this.hideAnchorPanel,
      onOverrideContent: this.props.onOverrideContent,
      uiSettings,
    };

    const AnchorPanelContainerWithProps = decorateComponentWithProps(
      AnchorPanelContainer,
      anchorContainerProps
    );
    this.props.onOverrideContent(AnchorPanelContainerWithProps);
  }

  updateAnchor = ({ name }) => {
    const { pubsub } = this.props;
    // const metadata = this.state.metadata || {};
    pubsub.update('componentData', { name });
    this.hideAnchorPanel();
  };

  hideAnchorPanel = () => {
    this.props.onOverrideContent(undefined);
  };

  render() {
    return false;
  }
}

AnchorLinkPanel.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  onExtendContent: PropTypes.func.isRequired,
  onOverrideContent: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
  t: PropTypes.func,
  uiSettings: PropTypes.object,
  helpers: PropTypes.object,
  pubsub: PropTypes.object.isRequired,
};

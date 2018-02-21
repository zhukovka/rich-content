import React, { Component } from 'react';
import PropTypes from 'prop-types';
import decorateComponentWithProps from 'decorate-component-with-props';
import { hasLinksInSelection } from '~/Utils';
import LinkButton from '~/Components/LinkButton';
import TextLinkPanel from './TextLinkPanel';

export default class TextLinkButton extends Component {
  showLinkPanel = () => {
    const { onExtendContent, onOverrideContent, theme } = this.props;
    const linkPanelProps = {
      onExtendContent,
      onOverrideContent,
      theme
    };
    const TextLinkPanelWithProps = decorateComponentWithProps(TextLinkPanel, linkPanelProps);
    onExtendContent(TextLinkPanelWithProps);
  }

  get isActive() {
    return hasLinksInSelection(this.props.getEditorState());
  }

  render() {
    const { theme } = this.props;
    return (<LinkButton
      onClick={this.showLinkPanel}
      isActive={this.isActive}
      theme={theme}
    />);
  }
}

TextLinkButton.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  onExtendContent: PropTypes.func.isRequired,
  onOverrideContent: PropTypes.func.isRequired,
  theme: PropTypes.object,
};

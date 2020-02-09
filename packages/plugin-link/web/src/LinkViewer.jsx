import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { normalizeUrl, mergeStyles, validate, pluginLinkSchema } from 'wix-rich-content-common';
import { invoke, isEqual } from 'lodash';
import styles from '../statics/link-viewer.scss';
import { ANCHOR_PLUGIN_PRE_NAME } from 'wix-rich-content-editor-common';

class LinkViewer extends Component {
  static propTypes = {
    componentData: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    children: PropTypes.node,
    anchorTarget: PropTypes.string,
    relValue: PropTypes.string,
    settings: PropTypes.object,
  };

  constructor(props) {
    super(props);
    validate(props.componentData, pluginLinkSchema);
    this.state = { styles };
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.componentData, this.props.componentData)) {
      validate(nextProps.componentData, pluginLinkSchema);
    }
  }

  componentDidMount() {
    const theme = this.props.theme;
    this.setState({ styles: mergeStyles({ styles, theme }) });
  }

  handleClick = event => {
    invoke(this, 'props.settings.onClick', event, this.getHref());
  };

  getHref() {
    const href =
      normalizeUrl(this.props.componentData.url) ||
      `#${ANCHOR_PLUGIN_PRE_NAME.HTML_PRE_NAME}-${this.props.componentData.url}`;
    return href;
  }

  render() {
    const { componentData, anchorTarget, relValue, children } = this.props;
    const { target, rel } = componentData;
    const anchorProps = {
      href: this.getHref(),
      target: target ? target : anchorTarget || '_self',
      rel: rel ? rel : relValue || 'noopener',
      className: this.state.styles.link,
      onClick: this.handleClick,
    };
    return <a {...anchorProps}>{children}</a>;
  }
}

export default LinkViewer;

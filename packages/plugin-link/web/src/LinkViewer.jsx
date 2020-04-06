import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  normalizeUrl,
  mergeStyles,
  validate,
  pluginLinkSchema,
  // isValidUrl,
} from 'wix-rich-content-common';
import { invoke, isEqual } from 'lodash';
import styles from '../statics/link-viewer.scss';

class LinkViewer extends Component {
  static propTypes = {
    componentData: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    children: PropTypes.node,
    anchorTarget: PropTypes.string,
    relValue: PropTypes.string,
    settings: PropTypes.object,
    renderInEditor: PropTypes.bool,
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
    // if (!isValidUrl(this.props.componentData.url)) {
    //   console.log('this.getHref() - ', this.getHref().substr(1));
    //   const element = document.getElementById(this.getHref().substr(1));
    //   element.scrollIntoView({ behavior: 'smooth' });
    // }
  };

  getHref() {
    const { renderInEditor } = this.props;
    const renderedIn = renderInEditor ? 'editor' : 'viewer';
    const href =
      normalizeUrl(this.props.componentData.url) ||
      `#${renderedIn}-${this.props.componentData.url}`;
    return href;
  }

  render() {
    const { componentData, anchorTarget, relValue, children } = this.props;
    const { target, rel } = componentData;
    const anchorProps = {
      // href: isValidUrl(this.props.componentData.url) ? this.getHref() : undefined,
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

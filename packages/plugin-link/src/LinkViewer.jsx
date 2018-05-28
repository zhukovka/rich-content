import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { normalizeURL, mergeStyles } from 'wix-rich-content-common';
import styles from './link.scss';

class LinkViewer extends Component {

  static propTypes = {
    componentData: PropTypes.object.isRequired,
    theme: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node,
    anchorTarget: PropTypes.string,
    relValue: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }
  render() {
    const { styles, props } = this;
    const { componentData, anchorTarget, relValue, className, children } = props;
    const { url, targetBlank, nofollow } = componentData;
    const anchorProps = {
      href: normalizeURL(url),
      target: targetBlank ? '_blank' : (anchorTarget || '_self'),
      rel: nofollow ? 'nofollow' : (relValue || null),
      className: classNames(styles.link, className),
    };
    return <a {...anchorProps} >{children}</a>;
  }
}

export default LinkViewer;

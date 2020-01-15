import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ReadMore as ReadMoreWrapper, Context, mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/read-more.scss';
class ReadMore extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    lines: PropTypes.number,
    text: PropTypes.string,
    ellipsis: PropTypes.string,
    label: PropTypes.string,
    onPreviewExpand: PropTypes.func.isRequired,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    onClick: () => {},
  };

  static contextType = Context.type;

  onClick = e => {
    e.preventDefault();
    this.props.onClick();
    this.props.onPreviewExpand();
  };

  onKeyDown = e => {
    if (e.keyCode === 13) {
      this.props.onClick();
    }
  };

  render() {
    this.styles = this.styles || mergeStyles({ styles, theme: this.context.theme });
    const {
      lines,
      text,
      ellipsis,
      label = this.context.t('Preview_ReadMore_Label'),
      children,
    } = this.props;
    return [
      <div
        role="link"
        tabIndex="0"
        className={this.styles.readMore_wrapper}
        onClick={this.props.onClick}
        onKeyDown={this.onKeyDown}
        key="readMoreOverlay"
      />,
      <ReadMoreWrapper
        key="readMoreEllipis"
        lines={lines}
        text={text}
        ellipsis={ellipsis}
        label={label}
      >
        {children}
      </ReadMoreWrapper>,
    ];
  }
}

export default ReadMore;

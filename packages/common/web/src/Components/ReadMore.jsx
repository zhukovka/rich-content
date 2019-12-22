import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import LinesEllipsis from 'react-lines-ellipsis';
import { mergeStyles } from '../Utils/mergeStyles';
import Context from '../Utils/Context';
import { getChildrenText } from '../Utils/getChildrenText';
import styles from '../../statics/styles/read-more.scss';

class ReadMore extends PureComponent {
  static propTypes = {
    ellipsis: PropTypes.string,
    label: PropTypes.string,
    lines: PropTypes.number,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    text: PropTypes.string,
    isExpanded: PropTypes.bool,
  };

  static defaultProps = {
    isExpanded: false,
    ellipsis: '…',
    lines: 3,
    onClick: () => {},
  };

  /* eslint-disable */
  render() {
    this.styles = this.styles || mergeStyles({ styles, theme: this.context.theme });
    const {
      lines,
      label,
      ellipsis,
      children,
      text,
      isExpanded,
    } = this.props;
    const textToCollapse = text || getChildrenText(children);
    return (
      <Fragment>
        <div className={this.styles.readMore_wrapper} onClick={this.props.onClick} />
        {isExpanded ? {textToCollapse} :
          <LinesEllipsis
            text={textToCollapse}
            className={this.styles.readMore}
            maxLine={lines}
            ellipsis={`${ellipsis} ${label}`}
          />}
      </Fragment>
    );
  }
  /* eslint-enable */
}

ReadMore.contextType = Context.type;

export default ReadMore;

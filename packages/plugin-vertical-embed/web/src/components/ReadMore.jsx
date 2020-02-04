import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import LinesEllipsis from 'react-lines-ellipsis';
import styles from '../../statics/styles/read-more.scss';
import { getChildrenText } from '../../../../preview/web/src/utils';
import { mergeStyles, Context } from 'wix-rich-content-common';

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
    const { lines, label, ellipsis, children, text, isExpanded } = this.props;
    const textToCollapse = text || getChildrenText(children);
    return (
      <Fragment>
        {isExpanded ? (
          { textToCollapse }
        ) : (
          <LinesEllipsis
            text={textToCollapse}
            className={this.styles.readMore}
            maxLine={lines}
            ellipsis={`${ellipsis} ${label}`}
          />
        )}
      </Fragment>
    );
  }
  /* eslint-enable */
}

ReadMore.contextType = Context.type;

export default ReadMore;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from '~/Styles/tooltip.scss';
import { mergeStyles } from '~/Utils';

class Tooltip extends Component {

  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  static propTypes = {
    children: PropTypes.node,
    theme: PropTypes.object.isRequired,
    content: PropTypes.string.isRequired,
    moveBy: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
    textAlign: PropTypes.oneOf(['center', 'left', 'right']),
    maxWidth: PropTypes.number,
    // shouldCloseOnClickOutside: PropTypes.bool,
  };

  static defaultProps = {
    moveBy: { x: 0, y: 0 },
    textAlign: 'center',
  };

  render() {
    const { children, content, moveBy, textAlign, maxWidth } = this.props;
    const { styles } = this;

    return (
      <div
        className={styles.tooltip}
        data-content={content}
        data-move-by-x={moveBy.x}
        data-move-by-y={moveBy.y}
        data-text-align={textAlign}
        data-max-width={maxWidth}
      >
        {children}
      </div>);
  }
}

export default Tooltip;

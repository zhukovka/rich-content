import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CustomProperties from 'react-custom-properties';

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
      <div className={styles.tooltip_container}>
        <CustomProperties
          properties={{
            '--content': `'${content}'`,
            '--moveByX': `${moveBy.x || 0}px`,
            '--moveByY': `${moveBy.y || 0}px`,
            '--textAlign': textAlign,
            '--maxWidth': maxWidth ? `${maxWidth}px` : '100%'
          }}
        >
          <div className={styles.tooltip}>
            {children}
          </div>
        </CustomProperties>
      </div>);
  }
}

export default Tooltip;

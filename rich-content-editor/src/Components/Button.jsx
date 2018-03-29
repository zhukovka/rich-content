import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from '~/Styles/button.scss';
import { mergeStyles } from '~/Utils/mergeStyles';

class Button extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['primary', 'secondary']),
    theme: PropTypes.object.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node,
    dataHook: PropTypes.string,
  };

  static defaultProps = {
    type: 'primary'
  };

  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  render() {
    const { onClick, className, type, children, dataHook } = this.props;
    return <button data-hook={dataHook} onClick={onClick} className={classnames(this.styles[`button_${type}`], className)}>{children}</button>;
  }
}

export default Button;

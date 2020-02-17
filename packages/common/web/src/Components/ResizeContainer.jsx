import React, { Component } from 'react';
import styles from '../../statics/styles/resize-container.scss';
import PropTypes from 'prop-types';

class ResizeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { displayDiv: null };
  }

  componentDidMount() {
    const { right, left, both } = this.props;
    const leftDiv = <div key="left" className={styles.resizeHandleL} />;
    const rightDiv = <div key="right" className={styles.resizeHandleR} />;
    const border = both ? [leftDiv, rightDiv] : left ? leftDiv : right ? rightDiv : null;
    this.setState(() => {
      return { displayDiv: border };
    });
  }

  render() {
    const { children, ...containerProps } = this.props;
    return (
      <div {...containerProps}>
        {this.state.displayDiv}
        {children}
      </div>
    );
  }
}

ResizeContainer.propTypes = {
  containerProps: PropTypes.object,
  children: PropTypes.any,
  right: PropTypes.bool,
  left: PropTypes.bool,
  both: PropTypes.bool,
};

export default ResizeContainer;

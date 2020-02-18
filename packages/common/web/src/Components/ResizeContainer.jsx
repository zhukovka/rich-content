import React, { Component } from 'react';
import styles from '../../statics/styles/resize-container.scss';
import PropTypes from 'prop-types';

class ResizeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { displayDiv: null };
  }

  componentDidMount() {
    const { both, right, left } = this.props.resizeDirections;
    const leftDiv = <div key="left" className={styles.resizeHandleL} />;
    const rightDiv = <div key="right" className={styles.resizeHandleR} />;
    const border = both ? [leftDiv, rightDiv] : left ? leftDiv : right ? rightDiv : null;
    this.setState(() => {
      return { displayDiv: border };
    });
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { children, resizeDirections, ...containerProps } = this.props;
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
  resizeDirections: PropTypes.object,
};

export default ResizeContainer;

import React from 'react';
import styles from '../../statics/styles/resize-container.scss';
import PropTypes from 'prop-types';

export const ResizeContainer = ({ right, left, both, children, ...containerProps }) => {
  const leftDiv = <div className={styles.resizeHandleL} />;
  const rightDiv = <div className={styles.resizeHandleR} />;
  const displayDiv = both ? [leftDiv, rightDiv] : left ? leftDiv : right ? rightDiv : null;

  return (
    <div {...containerProps}>
      {displayDiv}
      {children}
    </div>
  );
};

ResizeContainer.propTypes = {
  containerProps: PropTypes.object,
  resizeDirections: PropTypes.object,
  children: PropTypes.any,
  right: PropTypes.bool,
  left: PropTypes.bool,
  both: PropTypes.bool,
};

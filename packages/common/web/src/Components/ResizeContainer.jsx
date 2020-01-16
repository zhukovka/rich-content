import React from 'react';
import styles from '../../statics/styles/resize-container.scss';
import PropTypes from 'prop-types';

const ResizeDot = () => (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <g color="blue">
      <circle r="4" cx="5" cy="5" stroke="currentColor" fill="none" strokeWidth="0.5" />
    </g>
  </svg>
);

export const ResizeContainer = ({ /*right, left, both,*/ children, ...containerProps }) => {
  return (
    <div className={styles.container} {...containerProps}>
      <div className={styles.resizeHandleL}>
        <ResizeDot />
        <ResizeDot />
      </div>

      <div className={styles.image}> {children} </div>

      <div className={styles.resizeHandleR}>
        <ResizeDot />
        <ResizeDot />
      </div>
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

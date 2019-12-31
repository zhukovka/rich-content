import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayerWrapper from 'wix-rich-content-common/src/lib/reactPlayerWrapper';
export default function View(props) {
  const { data, getStyles, currentIndex, index } = props;
  const { src, type } = data.src;

  const styles = {
    lineHeight: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '100%',
    position: 'relative',
  };

  const height = (window.screen.height * 9) / 16;

  return (
    <div style={getStyles('view', props)}>
      {type === 'video' ? (
        <ReactPlayerWrapper
          url={src}
          styles={styles}
          disabled={currentIndex !== index}
          height={height}
          width={'80%'}
        />
      ) : (
        <img src={src} alt={''} style={styles} />
      )}
    </div>
  );
}

View.propTypes = {
  data: PropTypes.object,
  getStyles: PropTypes.func,
  currentIndex: PropTypes.number,
  index: PropTypes.number,
};

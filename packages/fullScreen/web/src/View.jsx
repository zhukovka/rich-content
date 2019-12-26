import React from 'react';
import PropTypes from 'prop-types';
import { ReactPlayerWrapper } from 'wix-rich-content-plugin-video';

export default function View(props) {
  const { data, getStyles } = props;
  const { src, type, width, height } = data.src;
  const styles = {
    lineHeight: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '100%',
    position: 'relative',
  };
  return (
    <div style={getStyles('view', props)}>
      {type !== 'video' ? (
        <img src={src} alt={''} style={styles} />
      ) : (
        <ReactPlayerWrapper url={src} style={styles} width={width} height={height} />
      )}
    </div>
  );
}

View.propTypes = {
  data: PropTypes.object,
  getStyles: PropTypes.func,
};

import React from 'react';
import PropTypes from 'prop-types';
import VideoView from './VideoView';
// TODO: explore shifting to ReactPlayerWrapper
// import { ReactPlayerWrapper } from 'wix-rich-content-plugin-video';
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

  return (
    <div style={getStyles('view', props)}>
      {type === 'video' ? (
        <VideoView url={src} styles={styles} disabled={currentIndex !== index} />
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

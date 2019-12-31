import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
// TODO: explore shifting to ReactPlayerWrapper
// import { ReactPlayerWrapper } from 'wix-rich-content-plugin-video';
export default function View(props) {
  const { data, getStyles } = props;
  const { src, type } = data.src;
  const styles = {
    lineHeight: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '100%',
    position: 'relative',
  };
  const width = window.screen.width - 200;
  const height = (window.screen.height * 9) / 16;

  return (
    <div style={getStyles('view', props)}>
      {type !== 'video' ? (
        <img src={src} alt={''} style={styles} />
      ) : (
        <ReactPlayer url={src} style={styles} height={height} width={width} />
      )}
    </div>
  );
}

View.propTypes = {
  data: PropTypes.object,
  getStyles: PropTypes.func,
};

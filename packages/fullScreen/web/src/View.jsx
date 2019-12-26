import React from 'react';
import PropTypes from 'prop-types';
import { normalizeUrl } from 'wix-rich-content-common';
import { ReactPlayerWrapper } from 'wix-rich-content-plugin-video';

export default function View(props) {
  const { data, getStyles } = props;
  let { src, type } = data.src;
  src = normalizeUrl(src);
  const styles = {
    lineHeight: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '100%',
    position: 'relative',
  };
  return (
    <div style={getStyles('view', props)}>
      {(type === 'video' && (
        <ReactPlayerWrapper url={src} style={styles} width={'90vw'} height={'90vh'} />
      )) || <img src={src} alt={''} style={styles} />}
    </div>
  );
}

View.propTypes = {
  data: PropTypes.object,
  getStyles: PropTypes.func,
};

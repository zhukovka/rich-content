/* eslint-disable */
export default componentData => {
  if (componentData.config) {
    return null;
  }

  const patch = { config: {} };
  const { alignment, size, src, oembed } = componentData;
  if (alignment) {
    delete componentData.alignment;
    patch.config.alignment = alignment;
    patch.config.size = 'small';
  } else {
    if (size) {
      delete componentData.size;
      if (size === 'smallCenter') {
        patch.config.size = 'small';
        patch.config.alignment = 'center';
      } else if (size === 'fullWidth') {
        patch.config.size = 'fullWidth';
        patch.config.alignment = 'center';
      }
    } else {
      if (src && src.width && src.width <= 740) {
        patch.config.size = 'original';
        patch.config.alignment = 'left';
      } else {
        patch.config.size = 'content';
        patch.config.alignment = 'center';
      }
    }
  }

  if (oembed) {
    delete componentData.url;
    patch.src = oembed.video_url;
  }

  return Object.assign({}, componentData, patch);
};

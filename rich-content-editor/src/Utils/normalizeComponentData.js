export default componentData => {
  if (componentData.config) {
    return null;
  }

  const patch = { config: {} };
  const { alignment, size, oembed } = componentData;
  if (alignment || size) {
    if (alignment) {
      delete componentData.alignment; //eslint-disable-line fp/no-delete
      patch.config.alignment = alignment;
      patch.config.size = 'small';
    }
    if (size) {
      delete componentData.size; //eslint-disable-line fp/no-delete
      if (size === 'smallCenter') {
        patch.config.size = 'small';
        patch.config.alignment = 'center';
      } else if (size === 'fullWidth') {
        patch.config.size = 'fullWidth';
        patch.config.alignment = 'center';
      } else if (size === 'original') {
        patch.config.size = 'original';
        patch.config.alignment = 'left';
      }
    }
  } else {
    patch.config.alignment = 'center';
    patch.config.size = 'content';
  }

  if (oembed) {
    delete componentData.url; //eslint-disable-line fp/no-delete
    patch.src = oembed.video_url;
  }

  return Object.assign({}, componentData, patch);
};

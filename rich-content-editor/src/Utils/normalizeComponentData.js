export default componentData => {
  if (componentData.config) {
    return null;
  }

  const config = {};
  const { alignment, size } = componentData;
  if (alignment || size) {
    if (alignment) {
      delete componentData.alignment; //eslint-disable-line fp/no-delete
      config.alignment = alignment;
      config.size = 'small';
    }
    if (size) {
      delete componentData.size; //eslint-disable-line fp/no-delete
      if (size === 'smallCenter') {
        config.size = 'small';
      } else if (size === 'fullWidth') {
        config.size = 'fullWidth';
      }
      config.alignment = 'center';
    }
  } else {
    config.alignment = 'center';
    config.size = 'content';
  }
  return Object.assign({}, componentData, { config });
};

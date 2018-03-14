export default componentData => {
  const { alignment, size } = componentData;
  if (alignment || size) {
    const config = {};
    if (alignment) {
      delete componentData.alignment; //eslint-disable-line fp/no-delete
      config.alignment = alignment;
    }
    if (size) {
      delete componentData.size; //eslint-disable-line fp/no-delete
      config.size = size;
    }
    return Object.assign({}, componentData, { config });
  }
  return null;
};

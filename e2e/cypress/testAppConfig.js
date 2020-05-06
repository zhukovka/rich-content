export const defaultConfig = {
  plugins: ['partialPreset'],
  toolbarConfig: {},
};

export const getPluginMenuConfig = (options = []) => {
  const addPluginMenuConfig = options.reduce((acc, option) => {
    acc[option] = true;
    return acc;
  }, {});
  return {
    toolbarConfig: { addPluginMenuConfig },
  };
};

export const getPluginsToConsumeConfig = plugin => {
  return { plugins: [plugin] };
};

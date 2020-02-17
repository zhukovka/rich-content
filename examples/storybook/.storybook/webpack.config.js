const wixStorybookConfig = require('yoshi/config/webpack.config.storybook');

module.exports = ({ config }) => {
  const baseConfig = wixStorybookConfig(config);
  return {
    ...baseConfig,
    plugins: [...baseConfig.plugins],
  };
};

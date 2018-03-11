const resources = {};
const requireContext = require.context('./', false, /\.json$/);
requireContext.keys().forEach(key => {
  const translation = requireContext(key);
  const lang = key.substr(key.lastIndexOf('_') + 1, 2);
  resources[lang] = { translation };
});

export default resources;

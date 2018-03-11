const resources = {};
if (require.context) {
  const requireContext = require.context('./', false, /\.json$/);
  requireContext.keys().forEach(key => {
    const translation = requireContext(key);
    const lang = key.substr(key.lastIndexOf('_') + 1, 2);
    resources[lang] = { translation };
  });
} else {
  resources.en = { translation: require('./messages_en.json') };
}

export default resources;

const isSSR = typeof window === 'undefined';
const requireAllScssFiles = require.context('./', true, /\.scss$/);
const resolvedThemes = requireAllScssFiles
  .keys()
  .reduce((prev, curr) => ({ ...prev, ...curr }), {});

const modalTheme = {
  content: {},
};

const theme = {
  modalTheme,
  ...resolvedThemes,
};

export default theme;

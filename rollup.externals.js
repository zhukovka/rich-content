const externals = [
  'assert',
  'classnames',
  'lodash',
  'prop-types',
  'react',
  'react-dom',
  'draft-js',
  'wix-rich-content-editor-common',
  'wix-rich-content-common',
  'react-i18next',
];

const excludedExternalsRegexArr = [
  /draft-js-plugins-editor/,
  /draft-js-.*?-plugin/,
  /react-click-outside/,
  'draft-js/lib/DraftOffsetKey',
  /wix-rich-content-editor-common\/.*?\.scss/,
  /wix-rich-content-common\/.*?\.scss/,
];

const localPrefixes = ['\0', '.', '/'];
const testRegex = (regex, id) => (typeof regex === 'string' ? regex === id : regex.test(id));

export const isExternal = id => {
  return (
    !localPrefixes.find(prefix => id.startsWith(prefix)) &&
    !excludedExternalsRegexArr.find(regex => testRegex(regex, id)) &&
    !!externals.find(externalName => new RegExp(externalName).test(id))
  );
};

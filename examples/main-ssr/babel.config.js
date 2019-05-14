function isWebTarget(caller) {
  return Boolean(caller && caller.target === 'web')
}

function isWebpack(caller) {
  return Boolean(caller && caller.name === 'babel-loader')
}

module.exports = api => {
  const web = api.caller(isWebTarget)
  const webpack = api.caller(isWebpack)

  return {
    presets: [
      '@babel/preset-react',
      '@babel/preset-env',
    ],
    plugins: [
      ["@babel/plugin-proposal-class-properties", { "loose": true }],
      "@babel/plugin-transform-runtime",
      "@babel/plugin-syntax-dynamic-import",
      "@loadable/babel-plugin"
    ]
  }
};

import * as React from 'react';
import PropTypes from 'prop-types';

import defaultTheme from 'stylable-components/dist/src/themes/default/theme.st.css';
import wixTheme from 'stylable-components/dist/src/themes/wix/theme.st.css';

const themes = {
  default: defaultTheme,
  wix: wixTheme,
};

export const ThemeProvider = props => {
  const theme = themes[props.theme] || defaultTheme;
  return <div {...theme('root')}>{props.children}</div>;
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.oneOf(['default', 'wix']).isRequired,
};

Object.defineProperty(ThemeProvider, 'name', { value: 'ThemeProvider' });

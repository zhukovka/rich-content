import * as React from 'react';
import PropTypes from 'prop-types';

import defaultTheme from 'stylable-components/dist/src/themes/default/theme.st.css';
import wixTheme from 'stylable-components/dist/src/themes/wix/theme.st.css';
import rceTheme from './rce-theme.st.css';

const themes = {
  default: defaultTheme,
  wix: wixTheme,
  rce: rceTheme
};

export const ThemeProvider = props => {
  const theme = themes[props.theme] || rceTheme;
  return <div {...theme('root')}>{props.children}</div>;
};

ThemeProvider.propTypes = {
  children: PropTypes.node,
  theme: PropTypes.oneOf(['default', 'wix', 'rce']),
};

Object.defineProperty(ThemeProvider, 'name', { value: 'ThemeProvider' });

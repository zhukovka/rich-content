import * as React from 'react';
import PropTypes from 'prop-types';

import theme from 'stylable-components/dist/src/themes/default/theme.st.css';

export const WixThemeProvider = props => <div {...theme('root')}>{props.children}</div>;

WixThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

Object.defineProperty(WixThemeProvider, 'name', { value: 'WixThemeProvider' });

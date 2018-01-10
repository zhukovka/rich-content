import * as React from 'react';
import { stylable } from 'wix-react-tools';

import theme from 'stylable-components/dist/src/themes/default/theme.st.css.js';

export const WixThemeProvider = stylable(theme)(props => <div children={props.children} />);

Object.defineProperty(WixThemeProvider, 'name', { value: 'WixThemeProvider' });

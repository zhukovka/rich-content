import * as React from 'react';
import { stylable } from 'wix-react-tools';

import theme from 'stylable-components/dist/src/themes/default/theme.st.css.js';

export const WixThemeProvier = stylable(theme)(props => <div children={props.children} />);

Object.defineProperty(WixThemeProvier, 'name', { value: 'WixThemeProvier' });

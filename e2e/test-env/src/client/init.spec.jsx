import React from 'react';

import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import TestApp from './TestApp';

import RichContentApp from '../../../../examples/main/shared/RichContentApp';

const props = {
  // initialState: window.__CONTENT_STATE__,
  isMobile: false,
  testAppPlugins: 'partialPreset',
};

describe('General', () => {
  it('should do nothing atm', () => {
    render(<RichContentApp app={TestApp} mode={'test'} {...props} />);

    expect(true).toBe(true);
  });
});

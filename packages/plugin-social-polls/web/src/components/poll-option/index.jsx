import React from 'react';

import { LAYOUT } from '../../constants';
import { withRCEHelpers } from '../rce-helpers-context';

import { PollGridOption } from './PollGridOption';
import { PollListOption } from './PollListOption';

export * from './types';

export const PollOption = withRCEHelpers(props => {
  const { layout } = props;

  switch (layout.poll?.type) {
    case LAYOUT.GRID:
      return <PollGridOption {...props} />;

    case LAYOUT.LIST:
    default:
      return <PollListOption {...props} />;
  }
});

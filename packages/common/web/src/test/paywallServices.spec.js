/* eslint-disable max-len */

import {
  insertPaywall,
  isPaywallInUse,
  removePaywall,
  cutContentUnderPaywall,
} from '../lib/paywallServices';
import mockPlainTextEditorState from '../../../../../e2e/tests/fixtures/plain.json';
// import mockPlainTextWithPaywallEditorState from '../../../../../e2e/tests/fixtures/paywall.json';

const mockPlainTextWithPaywallEditorState = {
  blocks: [
    {
      key: '50k2j',
      text:
        'Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. ',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: 'paywall-key',
      text: ' ',
      type: 'atomic',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [
        {
          offset: 0,
          length: 1,
          key: 0,
        },
      ],
      data: {},
    },
    {
      key: '4qd6h',
      text:
        'Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: '7vim0',
      text: 'Bring to the table win-win survival strategies to ensure proactive domination.',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: 'd4db7',
      text:
        'At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. ',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: 'b79hb',
      text: 'User generated content in real-time will have multiple touchpoints for offshoring.',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: '1j2hj',
      text:
        'Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. ',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: '2f6d6',
      text: 'Override the digital divide with additional clickthroughs from DevOps.',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: 'bmbre',
      text:
        'Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
  entityMap: {
    '0': {
      type: 'wix-draft-plugin-paywall',
      mutability: 'IMMUTABLE',
      data: {
        type: 'single',
        config: {},
      },
    },
  },
};

const cutContent = {
  blocks: [
    {
      key: '50k2j',
      text:
        'Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. ',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
  entityMap: {},
};

describe('Test paywall functions', () => {
  it('should insert paywall', () => {
    const newContentState = insertPaywall(mockPlainTextEditorState);
    expect(newContentState).toEqual(mockPlainTextWithPaywallEditorState);
  });
  it('should return false from isPaywallInUse function', () => {
    expect(isPaywallInUse(mockPlainTextEditorState)).toEqual(false);
  });
  it('should return true from isPaywallInUse function', () => {
    expect(isPaywallInUse(mockPlainTextWithPaywallEditorState)).toEqual(true);
  });
  it('should remove paywall', () => {
    const newContentState = removePaywall(mockPlainTextWithPaywallEditorState);
    expect(newContentState).toEqual(mockPlainTextEditorState);
  });
  it('should cut content paywall', () => {
    const newContentState = cutContentUnderPaywall(mockPlainTextWithPaywallEditorState);
    expect(newContentState).toEqual(cutContent);
  });
});

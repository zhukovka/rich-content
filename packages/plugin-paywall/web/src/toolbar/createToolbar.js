import createInlineButtons from './inline-buttons';

export default function createToolbar({ settings, styles }) {
  return {
    InlineButtons: createInlineButtons({ styles, settings }),
    name: 'paywall',
  };
}

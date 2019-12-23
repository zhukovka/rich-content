import createInlineButtons from './inline-buttons';

export default function createToolbar(settings) {
  return {
    InlineButtons: createInlineButtons(settings),
    name: 'link-preview',
  };
}

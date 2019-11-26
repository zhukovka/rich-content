import createInlineButtons from './inline-buttons';

export default function createToolbar() {
  return {
    InlineButtons: createInlineButtons(),
    name: 'link-preview',
  };
}

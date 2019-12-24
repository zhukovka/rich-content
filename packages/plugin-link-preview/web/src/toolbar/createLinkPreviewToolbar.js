import createInlineButtons from './inline-buttons';

export default function createToolbar(settings, setEditorState) {
  return {
    InlineButtons: createInlineButtons(settings, setEditorState),
    name: 'link-preview',
  };
}

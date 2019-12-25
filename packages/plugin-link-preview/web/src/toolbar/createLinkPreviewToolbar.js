import createInlineButtons from './inline-buttons';

export default function createToolbar(settings, setEditorState, getEditorState) {
  return {
    InlineButtons: createInlineButtons(settings, setEditorState, getEditorState),
    name: 'link-preview',
  };
}

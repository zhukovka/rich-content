import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';

export default function createToolbar({ helpers, t, anchorTarget }) {
  return {
    InlineButtons: createInlineButtons({ t, anchorTarget }),
    InsertButtons: createInsertButtons({ helpers, t }),
  };
}

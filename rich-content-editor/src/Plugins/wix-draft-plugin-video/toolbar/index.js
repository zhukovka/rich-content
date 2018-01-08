import InlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';

export default function createToolbar({ helpers }) {
  return {
    InlineButtons,
    InsertButtons: createInsertButtons({ helpers }),
  };
}

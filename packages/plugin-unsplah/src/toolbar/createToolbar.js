import createInlineButtons from './inline-unsplash-buttons';
import createInsertButtons from './insert-unsplash-buttons';

export default function createToolbar({ helpers, t, settings }) {
  return {
    InlineButtons: createInlineButtons({ t, settings }),
    InsertButtons: createInsertButtons({ helpers, t, settings }),
    name: 'unsplash',
  };
}

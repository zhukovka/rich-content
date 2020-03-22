import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';

export default function createToolbar({ settings, helpers, styles, t, isMobile }) {
  return {
    InlineButtons: createInlineButtons({ styles, t, settings, isMobile }),
    InsertButtons: createInsertButtons({ helpers, t, settings }),
    name: 'vertical-embed',
  };
}

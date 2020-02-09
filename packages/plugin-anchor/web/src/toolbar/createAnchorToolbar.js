import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';

export default function createAnchorToolbar({ settings, helpers, t }) {
  return {
    InlineButtons: createInlineButtons(),
    InsertButtons: createInsertButtons({ helpers, t, settings }),
    name: 'divider',
  };
}

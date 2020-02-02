import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';

export default function createAnchorToolbar({
  settings,
  helpers,
  styles,
  t,
  uiSettings,
  isMobile,
  anchorTarget,
  relValue,
}) {
  return {
    InlineButtons: createInlineButtons({
      t,
      uiSettings,
      styles,
      settings,
      isMobile,
      anchorTarget,
      relValue,
    }),
    InsertButtons: createInsertButtons({ helpers, t, settings }),
    name: 'divider',
  };
}

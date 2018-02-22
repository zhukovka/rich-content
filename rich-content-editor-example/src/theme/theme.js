import richContentEditorTheme from './rich-content-editor.theme.scss';
import linkifyTheme from './text-linkify.theme.scss';
import dividerTheme from './divider.theme.scss';
import htmlTheme from './html.theme.scss';
import imageTheme from './image.theme.scss';
import videoTheme from './video.theme.scss';
import commonTheme from './global.theme.scss';
import loaderTheme from './loader.theme.scss';
import buttonTheme from './button.theme.scss';
import imageComponentTheme from './image_component.theme.scss';
import inputWithLabelTheme from './input-with-label.theme.scss';
import radioGroupHorizontalTheme from './radio-group-horizontal.theme.scss';
import radioGroupTheme from './radio-group.theme.scss';
import settingsPanelFooterTheme from './settings-panel-footer.theme.scss';
import settingsSectionTheme from './settings-section.theme.scss';
import selectionListTheme from './selection-list.theme.scss';
import sliderTheme from './slider.theme.scss';
import tabsTheme from './tabs.theme.scss';
import tooltipTheme from './tooltip.theme.scss';
import toolbars from './toolbars';
import modals from './toolbars/modals';

const theme = {
  ...richContentEditorTheme,
  ...linkifyTheme,
  ...dividerTheme,
  ...htmlTheme,
  ...imageTheme,
  ...videoTheme,
  ...commonTheme,
  ...buttonTheme,
  ...loaderTheme,
  ...imageComponentTheme,
  ...inputWithLabelTheme,
  ...radioGroupHorizontalTheme,
  ...radioGroupTheme,
  ...settingsPanelFooterTheme,
  ...settingsSectionTheme,
  ...selectionListTheme,
  ...sliderTheme,
  ...tabsTheme,
  ...tooltipTheme,
  toolbars,
  modals
};

export default theme;

import { TOOLBARS } from 'wix-rich-content-editor-common';
import AnchorIcon from '../icons/anchor-icon.svg';
import { DEFAULTS } from '../constants';

export default ({ helpers, t, settings }) => {
  const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || AnchorIcon;
  return [
    {
      name: 'Anchor',
      type: 'Anchor',
      tooltipText: t('AnchorPlugin_AddAnchor_Tooltip'),
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
      Icon: icon,
      componentData: DEFAULTS,
      helpers,
      t,
    },
  ];
};

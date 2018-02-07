import TextToolbarTheme from './text-toolbar.theme.scss';
import SideToolbarTheme from './side-toolbar.theme.scss';
import PluginToolbarTheme from './plugin-toolbar.theme.scss';
import FooterToolbarTheme from './footer-toolbar.theme.scss';
import MobileToolbarTheme from './mobile-toolbar.theme.scss';
import MobileAddModalTheme from './mobile-add-modal.theme.scss';

const textToolbarTheme = () => {
  const {
    toolbar, buttons, extend,
    buttonWrapper, button, icon
  } = TextToolbarTheme;
  return {
    toolbarStyles: { toolbar, buttons, extend },
    buttonStyles: { buttonWrapper, button, icon },
  };
};

const sideToolbarTheme = () => {
  const {
    wrapper,
    floatingContainer, floatingIcon, toolbar,
    buttonWrapper, button, icon, label
  } = SideToolbarTheme;
  return {
    wrapperStyles: { wrapper },
    toolbarStyles: { floatingContainer, floatingIcon, toolbar },
    buttonStyles: { buttonWrapper, button, icon, label },
  };
};

const pluginToolbarTheme = () => {
  const {
    toolbar, buttons,
    buttonWrapper, button, icon, active,
    separator
  } = PluginToolbarTheme;
  return {
    toolbarStyles: { toolbar, buttons },
    buttonStyles: { buttonWrapper, button, icon, active },
    separatorStyles: { separator }
  };
};


const footerToolbarTheme = () => {
  const {
    toolbar, buttons, extend,
    buttonWrapper, button, icon,
    separator
  } = FooterToolbarTheme;
  return {
    toolbarStyles: { toolbar, buttons, extend },
    buttonStyles: { buttonWrapper, button, icon },
    separatorStyles: { separator }
  };
};

const mobileToolbarTheme = () => {
  const {
    toolbar, buttons, extend,
    buttonWrapper, button, icon,
    separator
  } = MobileToolbarTheme;
  return {
    toolbarStyles: { toolbar, buttons, extend },
    buttonStyles: { buttonWrapper, button, icon },
    separatorStyles: { separator }
  };
};

const mobileAddModalTheme = () => {
  const {
    wrapper, tile,
    buttonWrapper, button, icon, label
  } = MobileAddModalTheme;
  return {
    panelStyles: { wrapper, tile },
    buttonStyles: { buttonWrapper, button, icon, label },
  };
};
export default {
  text: textToolbarTheme(),
  side: sideToolbarTheme(),
  plugin: pluginToolbarTheme(),
  footer: footerToolbarTheme(),
  mobile: mobileToolbarTheme(),
  mobileAddModal: mobileAddModalTheme(),
};

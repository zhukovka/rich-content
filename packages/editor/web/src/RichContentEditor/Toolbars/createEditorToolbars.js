import {
  simplePubsub,
  getToolbarTheme,
  getConfigByFormFactor,
  TOOLBARS,
  DISPLAY_MODE,
  mergeToolbarSettings,
} from 'wix-rich-content-editor-common';
import { getDefaultToolbarSettings } from './default-toolbar-settings';
import { MobileTextButtonList, DesktopTextButtonList } from './buttons';
import {
  reducePluginTextButtonNames,
  mergeButtonLists,
  reducePluginTextButtons,
} from './buttons/utils';

const appendSeparator = ({ mergedList, sourceList, buttonData, formFactor }) => {
  if (
    mergedList.length === sourceList.length &&
    (!buttonData.position ||
      buttonData.position[formFactor] === undefined ||
      buttonData.position[formFactor] < 0 ||
      buttonData.position[formFactor] > mergedList.length)
  ) {
    return [...mergedList, 'Separator'];
  }
  return mergedList;
};

const appendSeparatorBetweenAllButtons = buttons => {
  buttons.mobile = [].concat(
    ...buttons.mobile.map((button, i) =>
      i < buttons.mobile.length - 1 ? [button, 'Separator'] : [button]
    )
  );
  buttons.desktop = [].concat(
    ...buttons.desktop.map((button, i) =>
      i < buttons.desktop.length - 1 ? [button, 'Separator'] : [button]
    )
  );
  return buttons;
};

const createEditorToolbars = ({ buttons, textAlignment, refId, context }) => {
  const { uiSettings, getToolbarSettings = () => [] } = context.config;
  const { pluginButtons, pluginTextButtons, inlinePluginButtons } = buttons;

  const { isMobile, theme = {} } = context;

  const pubsub = simplePubsub();

  const textButtons = {
    mobile: mergeButtonLists(
      MobileTextButtonList,
      reducePluginTextButtonNames(pluginTextButtons, ({ isMobile }) => isMobile !== false),
      'mobile',
      appendSeparator
    ),
    desktop: mergeButtonLists(
      DesktopTextButtonList,
      reducePluginTextButtonNames(pluginTextButtons),
      'desktop',
      appendSeparator
    ),
  };

  let inlineButtons = {
    mobile: mergeButtonLists(
      [],
      reducePluginTextButtonNames(inlinePluginButtons, ({ isMobile }) => isMobile !== false),
      'mobile'
    ),
    desktop: mergeButtonLists([], reducePluginTextButtonNames(inlinePluginButtons), 'desktop'),
  };

  inlineButtons = appendSeparatorBetweenAllButtons(inlineButtons);

  const pluginTextButtonsByFormFactor = {
    mobile: reducePluginTextButtons(pluginTextButtons, ({ isMobile }) => isMobile !== false),
    desktop: reducePluginTextButtons(pluginTextButtons),
  };

  const inlinePluginButtonsByFormFactor = {
    mobile: reducePluginTextButtons(inlinePluginButtons, ({ isMobile }) => isMobile !== false),
    desktop: reducePluginTextButtons(inlinePluginButtons),
  };

  const defaultSettings = getDefaultToolbarSettings({
    pluginButtons,
    textButtons,
    pluginTextButtons: pluginTextButtonsByFormFactor,
    inlineButtons,
    inlinePluginButtons: inlinePluginButtonsByFormFactor,
  });
  const customSettings = getToolbarSettings({
    pluginButtons,
    textButtons,
    pluginTextButtons: pluginTextButtonsByFormFactor,
    inlinePluginButtons: inlinePluginButtonsByFormFactor,
  });
  const toolbarSettings = mergeToolbarSettings({ defaultSettings, customSettings });
  const toolbars = {};

  toolbarSettings
    .filter(({ name }) => name !== TOOLBARS.PLUGIN)
    .filter(({ shouldCreate }) =>
      getConfigByFormFactor({ config: shouldCreate(), isMobile, defaultValue: true })
    )
    .forEach(
      ({
        name,
        getButtons,
        getTextPluginButtons,
        getPositionOffset,
        getVisibilityFn,
        getInstance,
        getDisplayOptions,
        getToolbarDecorationFn,
      }) => {
        toolbars[name] = getInstance({
          ...context,
          displayOptions: getConfigByFormFactor({
            config: getDisplayOptions(),
            isMobile,
            defaultValue: { displayMode: DISPLAY_MODE.NORMAL },
          }),
          toolbarDecorationFn: getConfigByFormFactor({
            config: getToolbarDecorationFn(),
            isMobile,
            defaultValue: () => null,
          }),
          textPluginButtons: getConfigByFormFactor({
            config: getTextPluginButtons(),
            isMobile,
            defaultValue: [],
          }),
          offset: getConfigByFormFactor({
            config: getPositionOffset(),
            isMobile,
            defaultValue: { x: 0, y: 0 },
          }),
          visibilityFn: getConfigByFormFactor({
            config: getVisibilityFn(),
            isMobile,
            defaultValue: () => true,
          }),
          buttons: getConfigByFormFactor({ config: getButtons(), isMobile, defaultValue: [] }),
          theme: { ...getToolbarTheme(theme, name.toLowerCase()), ...theme },
          defaultTextAlignment: textAlignment,
          pluginButtons,
          uiSettings,
          pubsub,
          refId,
        });
      }
    );

  return toolbars;
};

export default createEditorToolbars;

import { KeyBindingUtil, getDefaultKeyBinding } from '@wix/draft-js';
import isEqual from 'lodash/isEqual';
import { COMMANDS, MODIFIERS } from 'wix-rich-content-common';

const COMMAND_BY_SHORTCUT = [
  {
    command: COMMANDS.TITLE,
    modifiers: [MODIFIERS.COMMAND, MODIFIERS.SHIFT],
    key: '1'
  }, {
    command: COMMANDS.SUBTITLE,
    modifiers: [MODIFIERS.COMMAND, MODIFIERS.SHIFT],
    key: '2'
  }, {
    command: COMMANDS.ALIGN_LEFT,
    modifiers: [MODIFIERS.COMMAND],
    key: 'l'
  }, {
    command: COMMANDS.ALIGN_RIGHT,
    modifiers: [MODIFIERS.COMMAND],
    key: 'r'
  }, {
    command: COMMANDS.ALIGN_CENTER,
    modifiers: [MODIFIERS.COMMAND],
    key: 'e'
  }, {
    command: COMMANDS.JUSTIFY,
    modifiers: [MODIFIERS.COMMAND],
    key: 'j'
  }, {
    command: COMMANDS.NUMBERED_LIST,
    modifiers: [MODIFIERS.COMMAND],
    key: 'm'
  }, {
    command: COMMANDS.BULLET_LIST,
    modifiers: [MODIFIERS.COMMAND, MODIFIERS.SHIFT],
    key: 'l'
  }, {
    command: COMMANDS.CODE,
    modifiers: [MODIFIERS.COMMAND, MODIFIERS.SHIFT],
    key: '8'
  }, {
    command: COMMANDS.BLOCKQUOTE,
    modifiers: [MODIFIERS.COMMAND, MODIFIERS.SHIFT],
    key: '9'
  }];

const { hasCommandModifier, isCtrlKeyCommand, isOptionKeyCommand } = KeyBindingUtil;

function getModifiers(e) {
  return [
    ...(hasCommandModifier(e) ? [MODIFIERS.COMMAND] : []),
    ...(isCtrlKeyCommand(e) ? [MODIFIERS.CTRL] : []),
    ...(isOptionKeyCommand(e) ? [MODIFIERS.OPTION] : []),
    ...(e.shiftKey ? [MODIFIERS.SHIFT] : [])
  ];
}

function getCommandByShortcut(shortcut, bindingMap) {
  if (!shortcut) {
    return null;
  }

  const commands = bindingMap
    .filter(mapped => mapped.key === shortcut.key &&
      isEqual(mapped.modifiers, shortcut.modifiers))
    .map(mapped => mapped.command);

  return commands.length > 0 ? commands[0] : null;
}

export const keyBindingFn = customCommands => {
  const bindingMap = [...COMMAND_BY_SHORTCUT, ...customCommands];
  return e => {
    const shortcut = { modifiers: getModifiers(e), key: e.key };
    return getCommandByShortcut(shortcut, bindingMap) || getDefaultKeyBinding(e);
  };
};

// merges all plugin TextButtonMappers keyBindings int an object { commands: [{ cmd1 }, ...], commandHandlers: { cmd1: handler1, ... } }
export const initPluginKeyBindings = pluginTextButtonMappers =>
  pluginTextButtonMappers.reduce((bindings, mapper, i) => {
    const map = mapper();
    if (map) {
      // iterate each map
      const mapBindings = Object.keys(map).reduce((mapBindings, key) => {
        if (map[key].keyBindings && map[key].keyBindings.length > 0) {
          // array of commands per map
          const mapCommands = map[key].keyBindings.map(binding => ({
            ...binding.keyCommand,
            // avoid cross-plugin name collisions
            command: `${binding.keyCommand.command}_${i}`
          }));
          // handlers per map
          const mapCommandHandlers = {};
          map[key].keyBindings.forEach(binding => {
            Object.assign(mapCommandHandlers, { [`${binding.keyCommand.command}_${i}`]: binding.commandHandler });
          });
          // merge all map commands and handlers
          return {
            commands: [...mapBindings.commands, ...mapCommands],
            commandHandlers: { ...mapBindings.commandHandlers, ...mapCommandHandlers }
          };
        }
        return mapBindings;
      }, { commands: [], commandHandlers: {} });
      // merge all commands and handlers
      return {
        commands: [...bindings.commands, ...mapBindings.commands],
        commandHandlers: { ...bindings.commandHandlers, ...mapBindings.commandHandlers }
      };
    }
    return bindings;
  }, { commands: [], commandHandlers: {} });

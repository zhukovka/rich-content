export const TITLE_FONT_STYLE = {
  H1: 'header-one',
  H2: 'header-two',
  H3: 'header-three',
  H4: 'header-four',
  H5: 'header-five',
  H6: 'header-six',
  P: 'unstyled',
};

export const DEFAULT_PIXELS_HEADING = {
  H1: '32px',
  H2: '28px',
  H3: '22px',
  H4: '16px',
  H5: '13.28px',
  H6: '10.72px',
  P: '16px',
};

export const DEFAULT_FONTS_DROPDOWN_OPTIONS = ['P', 'H2', 'H3', 'H4', 'H5', 'H6'];

export const COMMANDS = Object.freeze({
  TITLE: 'header-two',
  SUBTITLE: 'header-three',
  ALIGN_LEFT: 'left',
  ALIGN_RIGHT: 'right',
  ALIGN_CENTER: 'center',
  JUSTIFY: 'justify',
  NUMBERED_LIST: 'ordered-list-item',
  BULLET_LIST: 'unordered-list-item',
  CODE: 'code-block',
  BLOCKQUOTE: 'blockquote',
  BACKSPACE: 'backspace',
  DELETE: 'delete',
  TAB: 'tab',
  SHIFT_TAB: 'shiftTab',
});

export const MODIFIERS = Object.freeze({
  COMMAND: 'command',
  OPTION: 'option',
  SHIFT: 'shift',
});

export const TOOLBARS = Object.freeze({
  SIDE: 'SIDE',
  MOBILE: 'MOBILE', //Text Toolbar
  FOOTER: 'FOOTER',
  STATIC: 'TEXT', //Text Toolbar
  INLINE: 'INLINE', //Text Toolbar
  PLUGIN: 'PLUGIN',
  TEXT: 'ALL-TEXT-TOOLBARS',
});

export const DISPLAY_MODE = Object.freeze({
  NORMAL: 'NORMAL',
  FLOATING: 'FLOATING',
});

export const DECORATION_MODE = Object.freeze({
  PREPEND: 'PREPEND',
  WRAP: 'WRAP',
  APPEND: 'APPEND',
});

export const PLUGIN_DECORATIONS = Object.freeze({
  RESIZEABLE: 'RESIZEABLE',
});

export const PLUGIN_DECORATION_PROPS = Object.freeze({
  [PLUGIN_DECORATIONS.RESIZEABLE]: props => ({
    onMouseDown: props.onMouseDown,
    onMouseMove: props.onMouseMove,
    onMouseLeave: props.onMouseLeave,
    style: props.style,
    width: props.width,
    containerClassName: props.containerClassName,
  }),
});

export const TOOLBAR_OFFSETS = Object.freeze({
  top: 12,
  left: 15,
});

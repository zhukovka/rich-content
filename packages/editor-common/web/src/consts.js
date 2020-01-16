import React from 'react';
import { ResizeContainer } from 'wix-rich-content-common/src/Components/ResizeContainer';

export const COMMANDS = {
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
};

export const MODIFIERS = {
  COMMAND: 'command',
  CTRL: 'ctrl',
  OPTION: 'option',
  SHIFT: 'shift',
};

export const TOOLBARS = {
  SIDE: 'SIDE',
  MOBILE: 'MOBILE', //Text Toolbar
  FOOTER: 'FOOTER',
  STATIC: 'TEXT', //Text Toolbar
  INLINE: 'INLINE', //Text Toolbar
  PLUGIN: 'PLUGIN',
  TEXT: 'ALL-TEXT-TOOLBARS',
};

export const DISPLAY_MODE = {
  NORMAL: 'NORMAL',
  FLOATING: 'FLOATING',
};

export const DECORATION_MODE = {
  PREPEND: 'PREPEND',
  WRAP: 'WRAP',
  APPEND: 'APPEND',
};

export const PLUGIN_DECORATIONS = {
  RESIZEABLE: 'RESIZEABLE',
};

export const PLUGIN_DECORATION_PROPS = {
  [PLUGIN_DECORATIONS.RESIZEABLE]: props => ({
    onMouseDown: props.onMouseDown,
    onMouseMove: props.onMouseMove,
    onMouseLeave: props.onMouseLeave,
    style: props.style,
    width: props.width,
    containerClassName: props.containerClassName,
    // eslint-disable-next-line react/prop-types
    DecorateContainer: ({ children, ...containerProps }) => {
      return (
        // eslint-disable-next-line react/prop-types
        <ResizeContainer {...props.resizeDirections} {...containerProps}>
          {children}
        </ResizeContainer>
      );
    },
  }),
};

export const TOOLBAR_OFFSETS = {
  top: 12,
  left: 15,
};

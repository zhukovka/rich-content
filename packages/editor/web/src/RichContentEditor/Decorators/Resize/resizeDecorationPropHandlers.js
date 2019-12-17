import { PLUGIN_DECORATION_PROPS, PLUGIN_DECORATIONS } from 'wix-rich-content-editor-common';

export const pluginDecorationProps = (props, componentData) => {
  const resizeableProps = PLUGIN_DECORATION_PROPS[PLUGIN_DECORATIONS.RESIZEABLE](props);
  const decorationProps = { ...resizeableProps };
  if (componentData) {
    const { size } = componentData.config;
    const isInlineSize = size === 'inline';
    const { width, ...rest } = resizeableProps.style; // eslint-disable-line no-unused-vars
    const style = isInlineSize ? resizeableProps.style : { ...rest };
    decorationProps.style = style;
  }
  return decorationProps;
};

export const componentWillReceiveDecorationProps = (props, nextProps, onPropsChange) => {
  const { width } = PLUGIN_DECORATION_PROPS[PLUGIN_DECORATIONS.RESIZEABLE](props);
  const { width: nextWidth } = PLUGIN_DECORATION_PROPS[PLUGIN_DECORATIONS.RESIZEABLE](nextProps);
  if (width !== nextWidth) {
    onPropsChange({ size: 'inline', width: nextWidth });
  }
};

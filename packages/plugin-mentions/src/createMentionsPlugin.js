import { createBasePlugin, mergeStyles } from 'wix-rich-content-common';
import createMentionPlugin from 'draft-js-mention-plugin';
import decorateComponentWithProps from 'decorate-component-with-props';
import { EXTERNAL_MENTIONS_TYPE } from './types';
import MentionComponent from './MentionComponent';
import MentionSuggestionsWrapper from './MentionSuggestionsWrapper';
import 'draft-js-mention-plugin/lib/plugin.css';
import Styles from './styles.scss';

const createMentionsPlugin = (config = {}) => {
  const type = EXTERNAL_MENTIONS_TYPE;
  const {
    decorator,
    helpers,
    theme,
    isMobile,
    t,
    anchorTarget,
    relValue,
    mentions: settings = {},
  } = config;
  const styles = mergeStyles({ styles: Styles, theme });

  const plugin = createMentionPlugin({
    mentionComponent: decorateComponentWithProps(MentionComponent, { settings, styles }),
    theme: styles,
    mentionPrefix: settings.mentionPrefix || '@'
  });

  const inlineModals = [
    decorateComponentWithProps(MentionSuggestionsWrapper, {
      component: plugin.MentionSuggestions,
      styles,
    }),
  ];

  return createBasePlugin(
    {
      decorator,
      theme,
      type,
      helpers,
      isMobile,
      anchorTarget,
      inlineModals,
      relValue,
      t,
    },
    plugin,
  );
};

export { createMentionsPlugin };

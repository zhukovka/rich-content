import React from 'react';
import { createBasePlugin } from 'wix-rich-content-common';
import { EXTERNAL_MENTIONS_TYPE } from './types';
import createMentionPlugin from 'draft-js-mention-plugin';
import 'draft-js-mention-plugin/lib/plugin.css';
import './styles.scss';

const mentions = [
  {
    name: 'Matthew Russell',
    link: 'https://twitter.com/mrussell247',
    avatar: 'https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg',
  },
  {
    name: 'Julian Krispel-Samsel',
    link: 'https://twitter.com/juliandoesstuff',
    avatar: 'https://avatars2.githubusercontent.com/u/1188186?v=3&s=400',
  },
  {
    name: 'Jyoti Puri',
    link: 'https://twitter.com/jyopur',
    avatar: 'https://avatars0.githubusercontent.com/u/2182307?v=3&s=400',
  },
  {
    name: 'Max Stoiber',
    link: 'https://twitter.com/mxstbr',
    avatar: 'https://pbs.twimg.com/profile_images/763033229993574400/6frGyDyA_400x400.jpg',
  },
  {
    name: 'Nik Graf',
    link: 'https://twitter.com/nikgraf',
    avatar: 'https://avatars0.githubusercontent.com/u/223045?v=3&s=400',
  },
  {
    name: 'Pascal Brandt',
    link: 'https://twitter.com/psbrandt',
    avatar: 'https://pbs.twimg.com/profile_images/688487813025640448/E6O6I011_400x400.png',
  },
];


const createMentionsPlugin = (config = {}) => {
  const plugin = createMentionPlugin();
  const type = EXTERNAL_MENTIONS_TYPE;
  const { decorator, helpers, theme, isMobile, t, anchorTarget, relValue } = config;

  // MentionSuggestions = plugin.MentionSuggestions

  const inlineModals = [
    () => {
      const Comp = plugin.MentionSuggestions;
      return (
        <Comp
          onSearchChange={() => {}}
          suggestions={mentions}
        />);
    }
  ];

  return createBasePlugin({
    decorator,
    theme,
    type,
    helpers,
    isMobile,
    anchorTarget,
    inlineModals,
    relValue,
    t
  }, plugin);
};


export { createMentionsPlugin };

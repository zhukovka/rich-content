import createToolbar from './toolbar';
import { Component } from './components/youtube-component';
import { YOUTUBE_TYPE } from './constants';
import { createBasePlugin } from 'wix-rich-content-common';

const createYoutubePlugin = (config = {}) => {
  const type = YOUTUBE_TYPE;
  const { helpers, t, [type]: settings = {}, ...rest } = config;
  return createBasePlugin({
    component: Component,
    type: YOUTUBE_TYPE,
    toolbar: createToolbar({
      helpers,
      t,
      settings,
    }),
    helpers,
    settings,
    t,
    ...rest,
  });
};

export { createYoutubePlugin };

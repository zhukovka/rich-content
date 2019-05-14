import theme from '../theme/theme';
import { videoTypeMapper } from 'wix-rich-content-plugin-video/dist/cjs/viewer';
import { dividerTypeMapper } from 'wix-rich-content-plugin-divider/dist/cjs/viewer';
import { HTML_TYPE, htmlTypeMapper } from 'wix-rich-content-plugin-html/dist/cjs/viewer';
import { soundCloudTypeMapper } from 'wix-rich-content-plugin-sound-cloud/dist/cjs/viewer';
import {
  LINK_TYPE,
  LinkParseStrategy,
  linkTypeMapper,
  LinkViewer,
} from 'wix-rich-content-plugin-link/dist/cjs/viewer';
import { imageTypeMapper } from 'wix-rich-content-plugin-image/dist/cjs/viewer';
import { mapTypeMapper } from 'wix-rich-content-plugin-map/dist/cjs/viewer';
import { Component as HashTag, Strategy as HashTagStrategy } from 'wix-rich-content-plugin-hashtag';
import {
  createHeadersMarkdownDecorator,
  HEADERS_MARKDOWN_TYPE,
} from 'wix-rich-content-plugin-headers-markdown';
import { CodeBlockDecorator } from 'wix-rich-content-plugin-code-block/dist/cjs/viewer';
import {
  MENTION_TYPE,
  mentionsTypeMapper,
} from 'wix-rich-content-plugin-mentions/dist/cjs/viewer';
import { fileUploadTypeMapper } from 'wix-rich-content-plugin-file-upload/dist/cjs/viewer';
import { createTextColorDecorator, TEXT_COLOR_TYPE } from 'wix-rich-content-plugin-text-color';
// import { galleryTypeMapper } from 'wix-rich-content-plugin-gallery/dist/cjs/viewer';

import { getViewerCustomStyleFn, getStyleSelectionPredicate } from '../text-color-style-fn';

const linkPluginSettings = {
  onClick: (event, url) => console.log('link clicked!', url),
};
const mentionsPluginSettings = {
  onMentionClick: mention => console.log('mention clicked!', mention),
  getMentionLink: () => '/link/to/mention',
};

const onHashTagClick = (event, text) => {
  event.preventDefault();
  console.log(`'${text}' hashtag clicked!`);
};

export const typeMappers = [
  videoTypeMapper,
  dividerTypeMapper,
  htmlTypeMapper,
  linkTypeMapper,
  soundCloudTypeMapper,
  mentionsTypeMapper,
  imageTypeMapper,
  mapTypeMapper,
  fileUploadTypeMapper,
  // galleryTypeMapper,
];

const themeColors = {
  color1: '#ffffff',
  color2: '#303030',
  color3: '#3a54b4',
  color4: '#bfad80',
  color5: '#bf695c',
  color6: '#f7f7f7',
  color7: '#000000',
  color8: '#9a87ce',
};

export const config = {
  [HEADERS_MARKDOWN_TYPE]: {
    hideMarkdown: true,
  },
  [HTML_TYPE]: {
    htmlIframeSrc: 'http://localhost:3000/static/html-plugin-embed.html',
  },
  [LINK_TYPE]: linkPluginSettings,
  [MENTION_TYPE]: mentionsPluginSettings,
  [TEXT_COLOR_TYPE]: {
    styleSelectionPredicate: getStyleSelectionPredicate(themeColors),
    customStyleFn: getViewerCustomStyleFn(themeColors),
  },
};

export const decorators = [
  {
    strategy: LinkParseStrategy,
    component: ({ children, decoratedText, rel, target }) => (
      <LinkViewer
        componentData={{ rel, target, url: decoratedText }}
        anchorTarget={anchorTarget}
        relValue={relValue}
        settings={linkPluginSettings}
      >
        {children}
      </LinkViewer>
    ),
  },
  {
    strategy: HashTagStrategy,
    component: ({ children, decoratedText }) => (
      <HashTag
        theme={theme}
        onClick={onHashTagClick}
        createHref={decoratedText =>
          `/search/posts?query=${encodeURIComponent('#')}${decoratedText}`
        }
        decoratedText={decoratedText}
      >
        {children}
      </HashTag>
    ),
  },
  new CodeBlockDecorator({ theme }),
  createHeadersMarkdownDecorator(config),
  createTextColorDecorator(config),
];

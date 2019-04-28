import theme from '../theme/theme';
import { videoTypeMapper } from 'wix-rich-content-plugin-video/dist/esm/viewer';
import { dividerTypeMapper } from 'wix-rich-content-plugin-divider/dist/esm/viewer';
import { HTML_TYPE, htmlTypeMapper } from 'wix-rich-content-plugin-html/dist/esm/viewer';
import { soundCloudTypeMapper } from 'wix-rich-content-plugin-sound-cloud/dist/esm/viewer';
import {
  LINK_TYPE,
  LinkParseStrategy,
  linkTypeMapper,
  LinkViewer,
} from 'wix-rich-content-plugin-link/dist/esm/viewer';
import { imageTypeMapper } from 'wix-rich-content-plugin-image/dist/esm/viewer';
import { mapTypeMapper } from 'wix-rich-content-plugin-map/dist/esm/viewer';
import { Component as HashTag, Strategy as HashTagStrategy } from 'wix-rich-content-plugin-hashtag';
import {
  createHeadersMarkdownDecorator,
  HEADERS_MARKDOWN_TYPE,
} from 'wix-rich-content-plugin-headers-markdown';
import { CodeBlockDecorator } from 'wix-rich-content-plugin-code-block/dist/esm/viewer';
import {
  MENTION_TYPE,
  mentionsTypeMapper,
} from 'wix-rich-content-plugin-mentions/dist/esm/viewer';
import { fileUploadTypeMapper } from 'wix-rich-content-plugin-file-upload/dist/esm/viewer';
import { TextColorDecorator } from 'wix-rich-content-plugin-text-color';

import 'wix-rich-content-common/dist/styles.min.css';
import 'wix-rich-content-viewer/dist/styles.min.css';
// import 'wix-rich-content-plugin-code-block/dist/styles.min.css';
import 'wix-rich-content-plugin-divider/dist/styles.min.css';
import 'wix-rich-content-plugin-emoji/dist/styles.min.css';
import 'wix-rich-content-plugin-hashtag/dist/styles.min.css';
import 'wix-rich-content-plugin-html/dist/styles.min.css';
import 'wix-rich-content-plugin-image/dist/styles.min.css';
import 'wix-rich-content-plugin-link/dist/styles.min.css';
import 'wix-rich-content-plugin-mentions/dist/styles.min.css';
import 'wix-rich-content-plugin-video/dist/styles.min.css';
import 'wix-rich-content-plugin-sound-cloud/dist/styles.min.css';
import 'wix-rich-content-plugin-map/dist/styles.min.css';
import 'wix-rich-content-plugin-file-upload/dist/styles.min.css';

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
];

export const config = {
  [HEADERS_MARKDOWN_TYPE]: {
    hideMarkdown: true,
  },
  [HTML_TYPE]: {
    htmlIframeSrc: 'http://localhost:3000/static/html-plugin-embed.html',
  },
  [LINK_TYPE]: linkPluginSettings,
  [MENTION_TYPE]: mentionsPluginSettings,
};

export const decorators = [
  TextColorDecorator,
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
];

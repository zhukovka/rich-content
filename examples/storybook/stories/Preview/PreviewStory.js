import React, { useState } from 'react';
import {
  RichContentViewerBox,
  RichContentEditorBox,
  Section,
  Page,
} from '../Components/StoryParts';
import { convertToRaw } from 'wix-rich-content-editor';

import { ContentStateTransformation, RichContentPreview } from 'wix-rich-content-preview';
import EditorWrapper from '../Components/EditorWrapper';
import { debounce } from 'lodash';
import * as Plugins from '../../../main/shared/preview/PreviewPlugins.jsx';

import introState from '../../../../e2e/tests/fixtures/intro.json';
import { VIDEO_TYPE, videoTypeMapper } from 'wix-rich-content-plugin-video/dist/module.viewer';
import { dividerTypeMapper } from 'wix-rich-content-plugin-divider/dist/module.viewer';
import { htmlTypeMapper } from 'wix-rich-content-plugin-html/dist/module.viewer';
import { soundCloudTypeMapper } from 'wix-rich-content-plugin-sound-cloud/dist/module.viewer';
import { LINK_TYPE, linkTypeMapper } from 'wix-rich-content-plugin-link/dist/module.viewer';
import {
  LINK_PREVIEW_TYPE,
  linkPreviewTypeMapper,
} from 'wix-rich-content-plugin-link-preview/dist/module.viewer';
import { imageTypeMapper } from 'wix-rich-content-plugin-image/dist/module.viewer';
import {
  galleryTypeMapper,
  GALLERY_TYPE,
} from 'wix-rich-content-plugin-gallery/dist/module.viewer';
import { mapTypeMapper } from 'wix-rich-content-plugin-map/dist/module.viewer';
import { giphyTypeMapper, GIPHY_TYPE } from 'wix-rich-content-plugin-giphy/dist/module.viewer';
import { buttonTypeMapper } from 'wix-rich-content-plugin-button/dist/module.viewer';
import { HashtagDecorator } from 'wix-rich-content-plugin-hashtag/dist/module.viewer';
import {
  MENTION_TYPE,
  mentionsTypeMapper,
} from 'wix-rich-content-plugin-mentions/dist/module.viewer';
import {
  fileUploadTypeMapper,
  FILE_UPLOAD_TYPE,
} from 'wix-rich-content-plugin-file-upload/dist/module.viewer';

export const typeMappers = [
  videoTypeMapper,
  buttonTypeMapper,
  dividerTypeMapper,
  htmlTypeMapper,
  linkTypeMapper,
  linkPreviewTypeMapper,
  soundCloudTypeMapper,
  mentionsTypeMapper,
  imageTypeMapper,
  galleryTypeMapper,
  mapTypeMapper,
  fileUploadTypeMapper,
  giphyTypeMapper,
];

export default () => {
  const [contentState, setContentState] = useState(introState);
  const onChange = debounce(changedEditorState => {
    setContentState(convertToRaw(changedEditorState.getCurrentContent()));
  }, 200);

  return (
    <Page title="Preview">
      <Section type={Section.Types.COMPARISON}>
        <RichContentEditorBox>
          <EditorWrapper contentState={contentState} onChange={onChange} />
        </RichContentEditorBox>

        <RichContentViewerBox>
          <RichContentPreview
            //   locale={this.props.locale}
            helpers={{}}
            typeMappers={Plugins.typeMappers}
            inlineStyleMappers={Plugins.getInlineStyleMappers(contentState)}
            decorators={Plugins.decorators}
            config={Plugins.config}
            initialState={contentState}
          />
        </RichContentViewerBox>
      </Section>
    </Page>
  );
};

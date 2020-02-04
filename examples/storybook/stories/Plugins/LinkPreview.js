import React from 'react';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { RichContentEditor, convertFromRaw, createWithContent } from 'wix-rich-content-editor';
import {
  linkPreviewTypeMapper,
  LINK_PREVIEW_TYPE,
} from 'wix-rich-content-plugin-link-preview/dist/module.viewer';
import { linkTypeMapper, LINK_TYPE } from 'wix-rich-content-plugin-link/dist/module.viewer';
import { createLinkPreviewPlugin } from 'wix-rich-content-plugin-link-preview';
import { createLinkPlugin } from 'wix-rich-content-plugin-link';

import LinkPreview from '../../fixtures/LinkPreview';
import { linkPreviewUtil } from 'wix-rich-content-common';

import {
  RichContentEditorBox,
  RichContentViewerBox,
  ContentState,
  Section,
  Page,
} from '../Components/StoryParts';

const typeMappers = [linkPreviewTypeMapper, linkTypeMapper];
const authorization = `D0nawxcVUD5MtaQ8yKCNagHIWvpDGTRGqUfKfaqtKok.eyJpbnN0YW5jZUlkIjoiZDM0MDgzYTItNTlhYi00MTJjLWI0NjItNzk1NTk0MWMxOWQwIiwiYXBwRGVmSWQiOiIxNGJjZGVkNy0wMDY2LTdjMzUtMTRkNy00NjZjYjNmMDkxMDMiLCJtZXRhU2l0ZUlkIjoiYmM0ZjIzODEtMzY1Mi00MTE4LWIxOGItY2NmNDE2MmZkZTA3Iiwic2lnbkRhdGUiOiIyMDIwLTAxLTE0VDE2OjMwOjEyLjY2OVoiLCJkZW1vTW9kZSI6ZmFsc2UsIm9yaWdpbkluc3RhbmNlSWQiOiI2N2RkZDA5ZS00YWU5LTQ5NWMtOWE4OS0wZGZiZGY4MTQ4ZTYiLCJhaWQiOiIyMWY2NzFiZS05OGZlLTQxMTctYjg4ZC02YzI2ZTJjN2YxNzkiLCJiaVRva2VuIjoiNmYwZmEwMjMtNmZmOS0wMDM0LTA1ZTktYjVhMTgyMzNjN2Q3Iiwic2l0ZU93bmVySWQiOiI4MTk2ZGM1Ni1kNDVjLTRkZWYtYTc2Ny0zMDAyNDZhYjBiN2EifQ`;
export default () => {
  const config = {
    [LINK_PREVIEW_TYPE]: {
      fetchMetadata: linkPreviewUtil(authorization),
      disableOembed: false,
    },
    [LINK_TYPE]: {
      preview: {
        enable: true,
        fetchMetadata: linkPreviewUtil(authorization),
      },
      onClick: (event, url) => console.log('link clicked!', url),
    },
  };
  const plugins = [createLinkPreviewPlugin, createLinkPlugin];
  return (
    <Page title="Link Preview">
      <Section type={Section.Types.COMPARISON}>
        <RichContentViewerBox preset="blog-preset">
          <RichContentViewer initialState={LinkPreview} typeMappers={typeMappers} />
        </RichContentViewerBox>
        <RichContentEditorBox preset="blog-preset">
          <RichContentEditor
            config={config}
            plugins={plugins}
            editorState={createWithContent(convertFromRaw(LinkPreview))}
          />
        </RichContentEditorBox>
      </Section>

      <Section title="Content State">
        <ContentState json={LinkPreview} />
      </Section>
    </Page>
  );
};

import React from 'react';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { RichContentEditor, convertFromRaw, createWithContent } from 'wix-rich-content-editor';

import { linkTypeMapper } from 'wix-rich-content-plugin-link/dist/module.viewer';
import { createLinkPlugin } from 'wix-rich-content-plugin-link';
import linkFixture from '../../../../e2e/tests/fixtures/link.json';
import {
  RichContentEditorBox,
  RichContentViewerBox,
  ContentState,
  Section,
  Page,
} from '../Components/StoryParts';
import ThemesExample from '../Components/ThemesExample';

const typeMappers = [linkTypeMapper];

export default () => {
  const plugins = [createLinkPlugin];
  return (
    <Page title="Anchor Plugin">
      <Section type={Section.Types.COMPARISON}>
        <RichContentEditorBox preset="blog-preset">
          <RichContentEditor
            plugins={plugins}
            editorState={createWithContent(convertFromRaw(linkFixture))}
          />
        </RichContentEditorBox>
        <RichContentViewerBox preset="blog-preset">
          <RichContentViewer initialState={linkFixture} typeMappers={typeMappers} />
        </RichContentViewerBox>
      </Section>
      <Section title="Content State">
        <ContentState json={linkFixture} />
      </Section>
      <Section title="themeing">
        <ThemesExample>
          <RichContentViewer initialState={linkFixture} typeMappers={typeMappers} />
        </ThemesExample>
      </Section>
    </Page>
  );
};

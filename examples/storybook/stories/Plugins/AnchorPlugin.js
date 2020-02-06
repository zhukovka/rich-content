import React from 'react';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { RichContentEditor, convertFromRaw, createWithContent } from 'wix-rich-content-editor';

import { anchorTypeMapper, ANCHOR_TYPE } from 'wix-rich-content-plugin-anchor/dist/module.viewer';
import { createAnchorPlugin } from 'wix-rich-content-plugin-anchor';
import anchorFixture from '../../../../e2e/tests/fixtures/anchor.json';
import {
  RichContentEditorBox,
  RichContentViewerBox,
  ContentState,
  Section,
  Page,
} from '../Components/StoryParts';
import ThemesExample from '../Components/ThemesExample';

const typeMappers = [anchorTypeMapper];

export default () => {
  const config = {
    [ANCHOR_TYPE]: {
      preview: {
        enable: true,
      },
    },
  };
  const plugins = [createAnchorPlugin];
  return (
    <Page title="Anchor Plugin">
      <Section type={Section.Types.COMPARISON}>
        <RichContentEditorBox preset="blog-preset">
          <RichContentEditor
            config={config}
            plugins={plugins}
            editorState={createWithContent(convertFromRaw(anchorFixture))}
          />
        </RichContentEditorBox>
        <RichContentViewerBox preset="blog-preset">
          <RichContentViewer initialState={anchorFixture} typeMappers={typeMappers} />
        </RichContentViewerBox>
      </Section>
      <Section title="Content State">
        <ContentState json={anchorFixture} />
      </Section>
      <Section title="themeing">
        <ThemesExample>
          <RichContentEditor
            config={config}
            plugins={plugins}
            editorState={createWithContent(convertFromRaw(anchorFixture))}
          />
        </ThemesExample>
      </Section>
    </Page>
  );
};

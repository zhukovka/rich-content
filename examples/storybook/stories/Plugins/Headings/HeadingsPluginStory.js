import React from 'react';
import { RichContentEditorBox, Section, Page } from '../../Components/StoryParts';
import { pluginHeadings } from 'wix-rich-content-plugin-headings';
import { convertFromRaw, createWithContent } from 'wix-rich-content-editor';
import headingsContentState from '../../../../../e2e/tests/fixtures/headings.json';
import HeadingsEditor from './HeadingsEditor';
import editorSourcecode from '!!raw-loader!./HeadingsEditor.js';

const editorState = createWithContent(convertFromRaw(headingsContentState));
export default () => {
  return (
    <Page title="Headings Plugin">
      <Section type={Section.Types.COMPARISON}>
        <RichContentEditorBox
          sourcecode={editorSourcecode}
          contentState={headingsContentState}
          subTitle="With Headings Menu"
        >
          <HeadingsEditor
            editorState={editorState}
            contentState={headingsContentState}
            pluginHeadings={pluginHeadings}
          />
        </RichContentEditorBox>
        <RichContentEditorBox subTitle="With Headings Button">
          <HeadingsEditor editorState={editorState} contentState={headingsContentState} />
        </RichContentEditorBox>
      </Section>
    </Page>
  );
};

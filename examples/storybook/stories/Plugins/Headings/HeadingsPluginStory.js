import React from 'react';
import {
  RichContentEditorBox,
  RichContentViewerBox,
  Section,
  Page,
} from '../../Components/StoryParts';

import { convertFromRaw, createWithContent } from 'wix-rich-content-editor';
import headingsContentState from '../../../../../e2e/tests/fixtures/headings.json';
import HeadingsEditor from './HeadingsEditor';
import editorSourcecode from '!!raw-loader!./HeadingsEditor.js';
import HeadingsViewer from './HeadingsViewer';
import viewerSourcecode from '!!raw-loader!./HeadingsViewer.js';

const editorState = createWithContent(convertFromRaw(headingsContentState));
export default () => {
  return (
    <Page title="Headings Plugin">
      <Section type={Section.Types.COMPARISON}>
        <RichContentEditorBox sourcecode={editorSourcecode} contentState={headingsContentState}>
          <HeadingsEditor editorState={editorState} contentState={headingsContentState} />
        </RichContentEditorBox>
        <RichContentViewerBox sourcecode={viewerSourcecode}>
          <HeadingsViewer initialState={headingsContentState} />
        </RichContentViewerBox>
      </Section>
    </Page>
  );
};

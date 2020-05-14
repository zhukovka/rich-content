import React from 'react';
import {
  RichContentEditorBox,
  RichContentViewerBox,
  Section,
  Page,
} from '../../Components/StoryParts';

import AnchorContentState from '../../../../../e2e/tests/fixtures/anchorable-plugins.json';
import EditorWrapper from '../../Components/EditorWrapper';
import ViewerWrapper from '../../Components/ViewerWrapper';

export default () => {
  return (
    <Page title="Anchor Plugin">
      <h3>As of today, anchor can be linked to one of the following:</h3>
      <h3>regular text (paragraphs), headers, code blocks, quotes, images, galleries and videos</h3>
      <Section type={Section.Types.COMPARISON}>
        <RichContentEditorBox contentState={AnchorContentState}>
          <EditorWrapper contentState={AnchorContentState} />
        </RichContentEditorBox>
        <RichContentViewerBox>
          <ViewerWrapper contentState={AnchorContentState} />
        </RichContentViewerBox>
      </Section>
    </Page>
  );
};

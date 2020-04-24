import React, { useState } from 'react';
import { htmlTypeMapper } from 'wix-rich-content-plugin-html/dist/module.viewer';
import { RichContentEditor, convertFromRaw, createWithContent } from 'wix-rich-content-editor';
import { Input } from 'wix-style-react';

import { RichContentEditorBox, ContentState, Section, Page } from '../Components/StoryParts';

import ContentStateBuilder from 'wix-rich-content-common/dist/lib/ContentStateBuilder';

const { Alignments, Sizes } = ContentStateBuilder;
const { CENTER, LEFT, RIGHT } = Alignments;
const { ORIGINAL, INLINE, SMALL, BEST_FIT, FULL_WIDTH } = Sizes;

import EditorWrapper from '../Components/EditorWrapper';

const contentStateObject = new ContentStateBuilder().addText('Initial Text');
import { wixPalettes } from '../palettesExample';
import { createImagePlugin } from 'wix-rich-content-plugin-image';

const PLUGINS = [createImagePlugin];

export default () => {
  const [contentState, setContentState] = useState(contentStateObject.getContent());
  const [textInput, setTextInput] = useState('');

  const updateContent = () => {
    setContentState(contentStateObject.getContent());
  };
  const addText = text => {
    contentStateObject.addText(text);
    updateContent();
    setTextInput('');
  };

  const addImage = () => {
    const imageSrc = {
      filename: '8bb438_095b661d7d2549efbde6b6e981eeb90b.jpg',
      width: 2557,
      height: 1700,
    };
    const imageConfig = {
      alignment: CENTER,
      size: BEST_FIT,
      showTitle: true,
      showDescription: true,
    };

    contentStateObject.addImage(imageSrc, imageConfig);
    updateContent();
  };
  const editorState = createWithContent(convertFromRaw(contentState));

  return (
    <Page title="Content Builder">
      <Section>
        <Input onChange={e => setTextInput(e.target.value)} value={textInput} />
        <button onClick={() => addText(textInput)}>Add Text</button>

        <button onClick={() => addImage()}>Add Image</button>
      </Section>
      <Section title={'RCE'}>
        <RichContentEditorBox preset="blog-preset">
          <RichContentEditor editorState={editorState} plugins={PLUGINS} />
        </RichContentEditorBox>
      </Section>
      <Section title={'RCE With wrapper'}>
        <RichContentEditorBox preset="blog-preset">
          <EditorWrapper contentState={contentState} palette={wixPalettes.site1} />
        </RichContentEditorBox>
      </Section>

      <Section title="Content State">
        <ContentState json={contentState} />
      </Section>
    </Page>
  );
};

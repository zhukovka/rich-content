import React from 'react';
import PropTypes from 'prop-types';

import { RichContentWrapper } from 'wix-rich-content-wrapper';
import { RichContentEditor } from 'wix-rich-content-editor';
import { pluginHtml } from 'wix-rich-content-plugin-html';
import { pluginLinkPreview } from 'wix-rich-content-plugin-link-preview';

const HtmlWithDomainStory = ({ contentState }) => {
  return (
    <RichContentWrapper
      plugins={[pluginHtml(), pluginLinkPreview()]}
      contentState={contentState}
      isEditor
    >
      <RichContentEditor
        initialState={contentState}
        iframeDomain="https://richcontent-sttorybook.filesusr.com"
      />
    </RichContentWrapper>
  );
};

HtmlWithDomainStory.propTypes = {
  contentState: PropTypes.object,
};

export default HtmlWithDomainStory;

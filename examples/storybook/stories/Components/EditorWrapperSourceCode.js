import React from 'react';
import PropTypes from 'prop-types';
import { RichContentEditor, convertFromRaw, createWithContent } from 'wix-rich-content-editor';
import { RichContentWrapper } from 'wix-rich-content-wrapper';
import { pluginButton } from 'wix-rich-content-plugin-button';
import { pluginCodeBlock } from 'wix-rich-content-plugin-code-block';
import { pluginDivider } from 'wix-rich-content-plugin-divider';
import { pluginEmoji } from 'wix-rich-content-plugin-emoji';
import { pluginFileUpload } from 'wix-rich-content-plugin-file-upload';
import { pluginGallery } from 'wix-rich-content-plugin-gallery';
import { configs } from './configs';
//...
import '../styles.global.scss';

const plugins = [
  pluginButton(),
  pluginCodeBlock(),
  pluginDivider(),
  pluginEmoji(),
  pluginFileUpload(configs.fileUpload),
  pluginGallery(),
  ///...
];

const WrapperExample = ({ contentState, palette }) => {
  const editorState = createWithContent(convertFromRaw(contentState));
  return (
    <RichContentWrapper plugins={plugins} theme={'Palette'} palette={palette} modalSupport>
      <RichContentEditor editorState={editorState} />
    </RichContentWrapper>
  );
};

WrapperExample.propTypes = {
  contentState: PropTypes.object,
  palette: PropTypes.arrayOf(PropTypes.object),
};

export default WrapperExample;

import {
  deleteBlock,
  createBasePlugin,
  insertLinkInPosition,
  fixPastedLinks,
} from 'wix-rich-content-editor-common';
import { addLinkPreview } from 'wix-rich-content-plugin-link-preview/dist/lib/utils';
import { isValidUrl } from 'wix-rich-content-common';
import { LINK_TYPE } from './types';
import { Component } from './LinkComponent';
import { linkEntityStrategy } from './strategy';
import createLinkToolbar from './toolbar/createLinkToolbar';

const createLinkPlugin = (config = {}) => {
  const type = LINK_TYPE;
  const { theme, anchorTarget, relValue, [type]: settings = {}, ...rest } = config;
  settings.minLinkifyLength = settings.minLinkifyLength || 6;
  const toolbar = createLinkToolbar(config);

  const decorators = [{ strategy: linkEntityStrategy, component: Component }];
  let linkifyData;
  const handleReturn = (event, editorState) => {
    linkifyData = getLinkifyData(editorState);
    const { preview } = settings;
    if (linkifyData && preview?.enable) {
      const url = getBlockLinkUrl(linkifyData);
      // url &&
      //   preview.fetchLinkMetdata(linkifyData.url)
      //     .then(({ title, description, thumbnail_url }) => {
      //       if (!!title || !!description || !!thumbnail_url) {
      //         linkifyData.preview = true;
      //       }
      //     });
      if (url) {
        linkifyData.preview = true;
        linkifyData.url = url;
      }
    }
  };

  const getBlockLinkUrl = linkifyData => {
    const { string, block } = linkifyData;
    if (block.getText() === string) {
      return string;
    }
  };

  const handleBeforeInput = (chars, editorState) => {
    if (/\s/.test(chars)) {
      linkifyData = getLinkifyData(editorState);
    }
  };

  let prevContentState;
  const isPasteChange = editorState => {
    const contentState = editorState.getCurrentContent();
    const contentChanged = contentState !== prevContentState;
    prevContentState = contentState;
    return contentChanged && editorState.getLastChangeType() === 'insert-fragment';
  };

  const onChange = editorState => {
    let newEditorState = editorState;
    if (isPasteChange(editorState)) {
      newEditorState = fixPastedLinks(editorState, { anchorTarget, relValue });
    } else if (linkifyData && !linkifyData.preview) {
      newEditorState = addLinkAt(linkifyData, editorState);
    } else if (linkifyData?.preview) {
      const withoutLinkBlock = deleteBlock(editorState, linkifyData.block.key);
      newEditorState = addLinkPreview(withoutLinkBlock, config, linkifyData.string);
    }
    linkifyData = false;
    return newEditorState;
  };

  const getLinkifyData = editorState => {
    const str = findLastStringWithNoSpaces(editorState);
    return shouldLinkify(str, editorState) && str;
  };

  const shouldLinkify = (consecutiveString, editorState) =>
    consecutiveString.string.length >= settings.minLinkifyLength &&
    isValidUrl(consecutiveString.string) &&
    (!rangeContainsEntity(consecutiveString) ||
      rangeContainsPreviewEntityAtEnd(editorState, consecutiveString));

  const findLastStringWithNoSpaces = editorState => {
    const selection = editorState.getSelection();
    const blockKey = selection.getAnchorKey();
    const block = editorState.getCurrentContent().getBlockForKey(blockKey);
    const text = block.getText();
    const endIndex = selection.getEndOffset();
    const index = text.lastIndexOf(' ', endIndex) + 1;
    const string = text.slice(index, endIndex);
    return { string, block, blockKey, index, endIndex };
  };

  const rangeContainsEntity = ({ block, index, endIndex }) => {
    // eslint-disable-next-line fp/no-loops
    for (let i = index; i < endIndex; i++) {
      if (block.getEntityAt(i) !== null) {
        return true;
      }
    }
    return false;
  };

  const rangeContainsPreviewEntityAtEnd = (editorState, { block, endIndex }) => {
    const key = block.getEntityAt(endIndex - 1);
    if (key && editorState.getCurrentContent().getEntity(key).type === 'LINK') {
      return true;
    }
    return false;
  };

  const addLinkAt = ({ string, index, endIndex, blockKey }, editorState) => {
    return insertLinkInPosition(editorState, blockKey, index, endIndex, {
      url: string,
      anchorTarget,
      relValue,
    });
  };

  return createBasePlugin(
    {
      theme,
      toolbar,
      type,
      anchorTarget,
      relValue,
      settings,
      ...rest,
    },
    { decorators, handleBeforeInput, handleReturn, onChange }
  );
};

export { createLinkPlugin };

import {
  deleteBlock,
  createBasePlugin,
  insertLinkInPosition,
  fixPastedLinks,
} from 'wix-rich-content-editor-common';
import { addLinkPreview } from 'wix-rich-content-plugin-link-preview/dist/lib/utils';
import { isValidUrl, fetchLinkMetdata } from 'wix-rich-content-common';
import { LINK_TYPE } from './types';
import { Component } from './LinkComponent';
import { linkEntityStrategy } from './strategy';
import createLinkToolbar from './toolbar/createLinkToolbar';
/* eslint-disable */
const AUTH_TOKEN = `D0nawxcVUD5MtaQ8yKCNagHIWvpDGTRGqUfKfaqtKok.eyJpbnN0YW5jZUlkIjoiZDM0MDgzYTItNTlhYi00MTJjLWI0NjItNzk1NTk0MWMxOWQwIiwiYXBwRGVmSWQiOiIxNGJjZGVkNy0wMDY2LTdjMzUtMTRkNy00NjZjYjNmMDkxMDMiLCJtZXRhU2l0ZUlkIjoiYmM0ZjIzODEtMzY1Mi00MTE4LWIxOGItY2NmNDE2MmZkZTA3Iiwic2lnbkRhdGUiOiIyMDIwLTAxLTE0VDE2OjMwOjEyLjY2OVoiLCJkZW1vTW9kZSI6ZmFsc2UsIm9yaWdpbkluc3RhbmNlSWQiOiI2N2RkZDA5ZS00YWU5LTQ5NWMtOWE4OS0wZGZiZGY4MTQ4ZTYiLCJhaWQiOiIyMWY2NzFiZS05OGZlLTQxMTctYjg4ZC02YzI2ZTJjN2YxNzkiLCJiaVRva2VuIjoiNmYwZmEwMjMtNmZmOS0wMDM0LTA1ZTktYjVhMTgyMzNjN2Q3Iiwic2l0ZU93bmVySWQiOiI4MTk2ZGM1Ni1kNDVjLTRkZWYtYTc2Ny0zMDAyNDZhYjBiN2EifQ`;
const mockBasePath = `https://cors-anywhere.herokuapp.com/http://stehauho.wixsite.com`;

const createLinkPlugin = (config = {}) => {
  const type = LINK_TYPE;
  const { theme, anchorTarget, relValue, [type]: settings = {}, ...rest } = config;
  settings.minLinkifyLength = settings.minLinkifyLength || 6;
  const toolbar = createLinkToolbar(config);

  const decorators = [{ strategy: linkEntityStrategy, component: Component }];
  let linkifyData;

  const handleReturn = async (event, editorState) => {
    linkifyData = getLinkifyData(editorState);
    if (linkifyData && settings.preview) {
      const url = getBlockLinkUrl(linkifyData);
      const { title, description, thumbnail_url } = await fetchLinkMetdata(
        url,
        mockBasePath,
        AUTH_TOKEN
      );
      if (url && (title || description || thumbnail_url)) {
        linkifyData = { ...linkifyData, preview: true, title, description, thumbnail_url };
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
    return shouldLinkify(str) && str;
  };

  const shouldLinkify = consecutiveString =>
    consecutiveString.string.length >= settings.minLinkifyLength &&
    isValidUrl(consecutiveString.string) &&
    !rangeContainsEntity(consecutiveString);

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

import { convertFromRaw as fromRaw, convertToRaw as toRaw, EditorState } from '@wix/draft-js';
import { version } from '../../package.json';
import { normalizeInitialState } from 'wix-rich-content-common';

const addVersion = (obj, version) => {
  obj.VERSION = version;
  return obj;
};

const fixBlockDataImmutableJS = contentState => {
  contentState.blocks.forEach(block =>
    Object.keys(block.data).forEach(key => {
      const value = block.data[key];
      if (value.toObject) {
        block.data[key] = value.toObject();
      }
    })
  );
  return contentState;
};

const convertToRaw = ContentState =>
  addVersion(fixBlockDataImmutableJS(toRaw(ContentState)), version);

const convertFromRaw = (rawState, { anchorTarget, relValue }) => {
  const normalizedState = normalizeInitialState(rawState, {
    anchorTarget,
    relValue,
  });
  return addVersion(fromRaw(normalizedState), normalizedState.VERSION);
};
const createEmpty = () => addVersion(EditorState.createEmpty(), version);
const createWithContent = contentState =>
  addVersion(EditorState.createWithContent(contentState), contentState.VERSION);

export { EditorState, createEmpty, createWithContent, convertToRaw, convertFromRaw };

import {
  textHighlightInlineStyleMapper,
  textColorInlineStyleMapper,
} from 'wix-rich-content-plugin-text-color/dist/module.viewer.cjs';
import createViewerBundle from './RichContentViewerWrapper';

export default () =>
  createViewerBundle([textHighlightInlineStyleMapper, textColorInlineStyleMapper]);

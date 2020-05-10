import { imageTypeMapper } from 'wix-rich-content-plugin-image/dist/module.viewer.cjs';
import createViewerBundle from './RichContentViewerWrapper';

export default () => createViewerBundle(imageTypeMapper);

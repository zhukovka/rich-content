import { mentionsTypeMapper } from 'wix-rich-content-plugin-mentions/dist/module.viewer.cjs';
import createViewerBundle from './RichContentViewerWrapper';

export default () => createViewerBundle(mentionsTypeMapper);

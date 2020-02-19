import { storiesOf } from '@storybook/react';
import LinkPreview from './LinkPreview';
import GalleryPlugin from './GalleryPlugin.js';

storiesOf('Plugins', module)
  .add('Link Preview', LinkPreview)
  .add('Gallery Plugin', GalleryPlugin);

import { storiesOf } from '@storybook/react';
import AnchorPlugin from './AnchorPlugin';
import LinkPlugin from './LinkPlugin';

storiesOf('Plugins', module)
  .add('Anchor Plugin', AnchorPlugin)
  .add('Link Plugin', LinkPlugin);

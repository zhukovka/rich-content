import { customClassName } from './classNameStrategies';
import { VERTICAL_EMBED_TYPE } from './createVerticalEmbedPlugin';
import VerticalEmbedComponent from './components/vertical-embed-component';

const verticalEmbedRenderDescriptor = {
  component: VerticalEmbedComponent,
  classNameStrategies: {
    custom: customClassName,
  },
};

export const typeMapper = () => ({
  [VERTICAL_EMBED_TYPE]: verticalEmbedRenderDescriptor,
});

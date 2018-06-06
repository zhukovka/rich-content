import { normalizeInitialState } from 'wix-rich-content-common';

export default initialState => normalizeInitialState(initialState, {
  configNormalization: {
    IMAGE: 'wix-draft-plugin-image',
    'VIDEO-EMBED': 'wix-draft-plugin-video',
  },
  dataNormalization: {
    LINK: 'LINK'
  }
});

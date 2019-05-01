import GiphyViewer from './dynamic-giphy-viewer';
import { GIPHY_TYPE } from './constants';

export const typeMapper = () => ({
  [GIPHY_TYPE]: { component: GiphyViewer },
});

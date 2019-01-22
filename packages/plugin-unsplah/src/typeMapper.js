import UnsplashViewer from './unsplash-viewer';
import { UNSPLASH_TYPE } from './constants';


export const typeMapper = () => ({
  [UNSPLASH_TYPE]: { component: UnsplashViewer },
});

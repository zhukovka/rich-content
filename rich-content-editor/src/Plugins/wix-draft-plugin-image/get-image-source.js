
import getWixMediaUrl from './get-wix-media-url';

const getImageSrc = (src, helpers) => {
  let imageUrl;
  if (src && src.file_name) {
    if (src.source) {
      if (src.source === 'static') {
        if (src.url) {
          imageUrl = src.url;
        } else {
          console.error('must provide src url when using static image source!', src); //eslint-disable-line no-console
        }
      } else if (src.source === 'custom') {
        if (helpers && helpers.getImageUrl) {
          imageUrl = helpers.getImageUrl({ file_name: src.file_name }); //eslint-disable-line camelcase
        } else {
          console.error('must provide getImageUrl helper when using custom image source!', src); //eslint-disable-line no-console
        }
      }
    } else {
      imageUrl = getWixMediaUrl({ file_name: src.file_name }); //eslint-disable-line camelcase
    }
  }

  return imageUrl;
};

export default getImageSrc;

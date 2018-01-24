
import getWixMediaUrl from './get-wix-media-url';

const getImageSrc = (item, helpers) => {
  let imageUrl;
  if (item && item.file_name) {
    if (item.source) {
      if (item.source === 'static') {
        if (item.url) {
          imageUrl = item.url;
        } else {
          console.error('must provide item url when using static image source!', item); //eslint-disable-line no-console
        }
      } else if (item.source === 'custom') {
        if (helpers && helpers.getImageUrl) {
          imageUrl = helpers.getImageUrl({ file_name: item.file_name }); //eslint-disable-line camelcase
        } else {
          console.error('must provide getImageUrl helper when using custom image source!', item); //eslint-disable-line no-console
        }
      }
    } else {
      imageUrl = getWixMediaUrl({ file_name: item.file_name }); //eslint-disable-line camelcase
    }
  }

  return imageUrl;
};

export default getImageSrc;

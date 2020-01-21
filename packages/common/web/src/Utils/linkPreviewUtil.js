const axios = require('axios');

export const linkPreviewUtil = authStr => {
  const _axios = axios.create({ headers: { Authorization: authStr } });
  const state = {};
  return async url => {
    const { title, description, thumbnail_url, html, url: oldUrl } = state;
    if (oldUrl === url && title && (description || thumbnail_url || html)) {
      return state;
    }
    let oEmbedRes;
    try {
      oEmbedRes = await _axios.get(`/rich-content/oembed?url=${url}`).then(res => res.data);
    } catch (e) {
      console.error('caught', e); //eslint-disable-line no-console
      oEmbedRes = {
        title: 'A mock title',
        description: 'A mock description',
        thumbnail_url:
          'https://image.insider.com/5de5784979d757159d0b6838?width=1100&format=jpeg&auto=webp',
      };
    }

    return oEmbedRes;
  };
};
